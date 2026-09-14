const fs = require("fs");
const path = require("path");
const Resume = require("../models/Resume");
const upload = require("../middlewares/uploadMiddleware");

const uploadResumeImage = async (req, res) => {
    upload.fields([{name: "thumnail"}, {name: "profileImage"}])(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ message: "Error uploading files" });
        }

        const resumeId = req.params.id;
        const resume = await Resume.findOne({_id: resumeId, userId: req.user._id});

        if (!resume) {
            return res.status(404).json({ message: "Resume not found" });
        }

        const uploadFolder = path.join(__dirname, "../uploads");
        const baseUrl = req.protocol + "://" + req.get("host");

        const newThumnail = req.files.thumnail?.[0];
        const newProfileImage = req.files.profileImage?.[0];

        // If new thumnail uploaded delete old thumnail
        if (newThumnail) {
            if (resume.thumnailLink) {
                const oldThumnail = path.join(uploadFolder, path.basename(resume.thumnailLink));
                if (fs.existsSync(oldThumnail)) {
                    fs.unlinkSync(oldThumnail);
                }
            }
            resume.thumnailLink = `${baseUrl}/uploads/${newThumnail.filename}`;
        }

        // If new profile image uploaded delete old profile image
        if (newProfileImage) {
            if (resume.contactInfo.profileImageUrl) {
                const oldProfileImage = path.join(uploadFolder, path.basename(resume.contactInfo.profileImageUrl));
                if (fs.existsSync(oldProfileImage)) {
                    fs.unlinkSync(oldProfileImage);
                }
            }
            resume.contactInfo.profileImageUrl = `${baseUrl}/uploads/${newProfileImage.filename}`;
        }

        await resume.save();
        res.status(200).json({
            code: 200,
            message: "Image uploaded successfully",
            thumnailLink: resume.thumnailLink,
            profileImageUrl: resume.contactInfo.profileImageUrl,
        });
    })
}

module.exports = {
    uploadResumeImage,
}