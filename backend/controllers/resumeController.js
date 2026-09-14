const fs = require('node:fs');
const path = require('node:path');
const Resume = require('../models/Resume');

/**
 * Create a new resume
 * @route POST /api/resume
 * @access Private
 */
const createResume = async (req, res) => {
    try {
        const { title, template } = req.body;
        
        const defaultResumeData = {
            title: title || "My Professional Resume",
            template: template || "black_white_minimalist",
            colorPalette: ["#00D2FF", "#8B5CF6"],
            status: "draft",
            fullName: "",
            jobTitle: "",
            thumbnailLink: "",
            thumnailLink: "",
            contactInfo: {
                profileImageUrl: "",
                email: "",
                phone: "",
                address: "",
                city: "",
                country: "",
                postalCode: "",
                website: "",
                linkedin: "",
                github: "",
                portfolio: "",
            },
            summary: "",
            skills: [
                { skillName: "Problem Solving", name: "Problem Solving", proficiency: "Expert", category: "Core" },
                { skillName: "Team Collaboration", name: "Team Collaboration", proficiency: "Advanced", category: "Soft Skills" }
            ],
            experience: [],
            education: [],
            projects: [],
            certifications: [],
            languages: [
                { language: "English", proficiency: "Native" }
            ],
            interests: [],
            awards: [],
            references: [],
            customSections: []
        };

        const newResume = await Resume.create({
            userId: req.user._id,
            ...defaultResumeData,
            ...req.body,
        });

        res.status(201).json(newResume);
    } catch (error) {
        console.error("Error creating resume:", error);
        res.status(500).json({ code: 500, message: 'Server error', error: error.message });
    }
};

/**
 * Get all resumes for current user with optional search & pagination
 * @route GET /api/resume
 * @access Private
 */
const getUserResumes = async (req, res) => {
    try {
        const { search } = req.query;
        const query = { userId: req.user._id };

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { fullName: { $regex: search, $options: 'i' } },
                { jobTitle: { $regex: search, $options: 'i' } }
            ];
        }

        const resumes = await Resume.find(query).sort({ updatedAt: -1, createdAt: -1 });
        res.status(200).json(resumes);
    } catch (error) {
        console.error("Error fetching resumes:", error);
        res.status(500).json({ code: 500, message: 'Server error', error: error.message });
    }
};

/**
 * Get a resume by ID
 * @route GET /api/resume/:id
 * @access Private
 */
const getResumeById = async (req, res) => {
    try {
        const resume = await Resume.findOne({ _id: req.params.id, userId: req.user._id });

        if (!resume) {
            return res.status(404).json({ code: 404, message: 'Resume not found' });
        }
        res.status(200).json(resume);
    } catch (error) {
        console.error("Error fetching resume by id:", error);
        res.status(500).json({ code: 500, message: 'Server error', error: error.message });
    }
};

/**
 * Update a resume
 * @route PUT /api/resume/:id
 * @access Private
 */
const updateResume = async (req, res) => {
    try {
        const resume = await Resume.findOne({ _id: req.params.id, userId: req.user._id });
        if (!resume) {
            return res.status(404).json({ code: 404, message: 'Resume not found' });
        }

        // Support syncing both thumbnailLink and thumnailLink
        if (req.body.thumbnailLink && !req.body.thumnailLink) {
            req.body.thumnailLink = req.body.thumbnailLink;
        } else if (req.body.thumnailLink && !req.body.thumbnailLink) {
            req.body.thumbnailLink = req.body.thumnailLink;
        }

        // Deep merge / assign properties
        Object.assign(resume, req.body);

        const updatedResume = await resume.save();
        res.status(200).json(updatedResume);
    } catch (error) {
        console.error("Error updating resume:", error);
        res.status(500).json({ code: 500, message: 'Server error', error: error.message });
    }
};

/**
 * Duplicate a resume
 * @route POST /api/resume/:id/duplicate
 * @access Private
 */
const duplicateResume = async (req, res) => {
    try {
        const originalResume = await Resume.findOne({ _id: req.params.id, userId: req.user._id }).lean();
        if (!originalResume) {
            return res.status(404).json({ code: 404, message: 'Original resume not found' });
        }

        delete originalResume._id;
        delete originalResume.createdAt;
        delete originalResume.updatedAt;
        originalResume.title = `${originalResume.title || 'Resume'} (Copy)`;

        const clonedResume = await Resume.create({
            ...originalResume,
            userId: req.user._id
        });

        res.status(201).json(clonedResume);
    } catch (error) {
        console.error("Error duplicating resume:", error);
        res.status(500).json({ code: 500, message: 'Server error', error: error.message });
    }
};

/**
 * Delete a resume
 * @route DELETE /api/resume/:id
 * @access Private
 */
const deleteResume = async (req, res) => {
    try {
        const resume = await Resume.findOne({ _id: req.params.id, userId: req.user._id });
        if (!resume) {
            return res.status(404).json({ code: 404, message: 'Resume not found' });
        }

        // Clean up uploaded thumbnail and profile image if stored locally
        const uploadFolder = path.join(__dirname, '../uploads');
        const candidateThumbnail = resume.thumbnailLink || resume.thumnailLink;
        if (candidateThumbnail) {
            const thumbnailPath = path.join(uploadFolder, path.basename(candidateThumbnail));
            if (fs.existsSync(thumbnailPath)) {
                try { fs.unlinkSync(thumbnailPath); } catch (e) {}
            }
        }

        if (resume.contactInfo && resume.contactInfo.profileImageUrl) {
            const profileImagePath = path.join(uploadFolder, path.basename(resume.contactInfo.profileImageUrl));
            if (fs.existsSync(profileImagePath)) {
                try { fs.unlinkSync(profileImagePath); } catch (e) {}
            }
        }

        await Resume.findOneAndDelete({ _id: req.params.id, userId: req.user._id });

        res.status(200).json({ code: 200, message: 'Resume deleted successfully' });
    } catch (error) {
        console.error("Error deleting resume:", error);
        res.status(500).json({ code: 500, message: 'Server error', error: error.message });
    }
};

module.exports = {
    createResume,
    getUserResumes,
    getResumeById,
    updateResume,
    duplicateResume,
    deleteResume
};