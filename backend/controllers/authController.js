const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const { OAuth2Client } = require('google-auth-library');

const googleClient = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
);

// Generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret', {
        expiresIn: '30d',
    });
};

/**
 * Register a new user
 * @route POST /api/auth/register
 * @access Public
 */
async function register(req, res) {
    try {
        const { name, email, password, profileImageUrl } = req.body;

        // Check if user already exists
        const userExists = await User.findOne({ email: email.toLowerCase() });
        if (userExists) {
            return res.status(400).json({ code: 400, message: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const user = await User.create({
            name,
            email: email.toLowerCase(),
            password: hashedPassword,
            profileImageUrl,
            provider: 'local',
        });

        // Return user data with jwt token
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profileImageUrl: user.profileImageUrl,
            provider: user.provider,
            token: generateToken(user._id),
        });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ code: 500, message: 'Server error', error: error.message });
    }
}

/**
 * Login a user
 * @route POST /api/auth/login
 * @access Public
 */
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Check if user exists
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(401).json({ code: 401, message: 'Invalid email or password' });
        }

        // Check if user registered via third-party without password
        if (!user.password && user.provider !== 'local') {
            return res.status(400).json({ 
                code: 400, 
                message: `This account was registered using ${user.provider}. Please use ${user.provider} Quick Login.` 
            });
        }

        // Check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ code: 401, message: 'Invalid email or password' });
        }

        // Return user data with jwt token
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profileImageUrl: user.profileImageUrl,
            provider: user.provider,
            headline: user.headline,
            token: generateToken(user._id),
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ code: 500, message: 'Server error', error: error.message });
    }
};

/**
 * Quick Social Sign In / Sign Up with Google or LinkedIn
 * @route POST /api/auth/social-login
 * @access Public
 */
const socialLogin = async (req, res) => {
    try {
        const {
            provider, // 'google' | 'linkedin'
            email,
            name,
            profileImageUrl,
            providerId,
            headline,
            location,
            rawProfile
        } = req.body;

        if (!email) {
            return res.status(400).json({ code: 400, message: 'Email is required from OAuth provider.' });
        }

        const normalizedEmail = email.toLowerCase().trim();

        // Check if user already exists
        let user = await User.findOne({ email: normalizedEmail });

        if (user) {
            // Update third party info if available
            if (profileImageUrl) {
                user.profileImageUrl = profileImageUrl;
            }
            if (provider && (!user.provider || user.provider === 'local')) {
                user.provider = provider;
            }
            if (providerId) {
                user.providerId = providerId;
            }
            if (headline && !user.headline) {
                user.headline = headline;
            }
            if (location && !user.location) {
                user.location = location;
            }
            if (rawProfile) {
                user.rawProfile = { ...(user.rawProfile || {}), ...rawProfile };
            }
            await user.save();
        } else {
            // Create new user from OAuth profile
            user = await User.create({
                name: name || normalizedEmail.split('@')[0],
                email: normalizedEmail,
                profileImageUrl: profileImageUrl || null,
                provider: provider || 'google',
                providerId: providerId || null,
                headline: headline || '',
                location: location || '',
                rawProfile: rawProfile || {},
                password: null,
            });
        }

        // Return authenticated user data with JWT token
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profileImageUrl: user.profileImageUrl,
            provider: user.provider,
            headline: user.headline,
            location: user.location,
            token: generateToken(user._id),
            message: `Successfully authenticated with ${provider || 'OAuth'}`
        });

    } catch (error) {
        console.error('Social Login error:', error);
        res.status(500).json({ code: 500, message: 'OAuth authentication failed', error: error.message });
    }
};

/**
 * Real Google OAuth verification and user creation / sign-in
 * Accepts Google ID token (credential) or Google OAuth Access Token
 * @route POST /api/auth/google
 * @access Public
 */
const googleAuth = async (req, res) => {
    try {
        const { credential, accessToken } = req.body;
        let email, name, picture, sub;

        if (credential) {
            // Verify Google ID Token (from Google Sign In button / One Tap)
            const ticket = await googleClient.verifyIdToken({
                idToken: credential,
                audience: process.env.GOOGLE_CLIENT_ID,
            });
            const payload = ticket.getPayload();
            email = payload.email;
            name = payload.name;
            picture = payload.picture;
            sub = payload.sub;
        } else if (accessToken) {
            // Fetch verified user profile directly from Google using access token
            const googleRes = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            email = googleRes.data.email;
            name = googleRes.data.name;
            picture = googleRes.data.picture;
            sub = googleRes.data.sub;
        } else {
            return res.status(400).json({ code: 400, message: 'Google credential or access token is required' });
        }

        if (!email) {
            return res.status(400).json({ code: 400, message: 'Unable to retrieve email from Google profile' });
        }

        const normalizedEmail = email.toLowerCase().trim();

        // Check if user already exists
        let user = await User.findOne({ email: normalizedEmail });

        if (user) {
            if (picture) {
                user.profileImageUrl = picture;
            }
            if (name && (!user.name || user.name === 'Google User' || user.name === 'User')) {
                user.name = name;
            }
            if (!user.provider || user.provider === 'local') {
                user.provider = 'google';
            }
            user.providerId = sub;
            await user.save();
        } else {
            user = await User.create({
                name: name || 'Google User',
                email: normalizedEmail,
                profileImageUrl: picture || '',
                provider: 'google',
                providerId: sub,
            });
        }

        const token = generateToken(user._id);

        return res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profileImageUrl: user.profileImageUrl,
            provider: user.provider,
            token,
            message: 'Successfully authenticated with Google'
        });
    } catch (error) {
        console.error('Google Auth verification error:', error);
        return res.status(401).json({
            code: 401,
            message: 'Failed to verify Google authentication',
            error: error.message
        });
    }
};

/**
 * Logout a user
 * @route GET /api/auth/logout
 * @access Private
 */
const logout = async (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
};

/**
 * Get user profile
 * @route GET /api/auth/profile
 * @access Private
 */
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        if (!user) {
            return res.status(404).json({ code: 404, message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ code: 500, message: 'Server error', error: error.message });
    }
};

module.exports = {
    register,
    login,
    socialLogin,
    googleAuth,
    logout,
    getUserProfile,
};