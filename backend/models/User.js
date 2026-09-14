const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: function() {
            // Password only required for local email/password sign-up
            return !this.provider || this.provider === 'local';
        },
        default: null
    },
    profileImageUrl: {
        type: String,
        default: null
    },
    provider: {
        type: String,
        enum: ['local', 'google', 'linkedin'],
        default: 'local'
    },
    providerId: {
        type: String,
        default: null
    },
    headline: {
        type: String,
        default: ''
    },
    location: {
        type: String,
        default: ''
    },
    bio: {
        type: String,
        default: ''
    },
    rawProfile: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);