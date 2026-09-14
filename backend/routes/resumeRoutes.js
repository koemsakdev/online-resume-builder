const express = require("express");
const {
    createResume,
    getUserResumes,
    getResumeById,
    updateResume,
    duplicateResume,
    deleteResume
} = require("../controllers/resumeController");
const { isAuthenticated } = require("../middlewares/authMiddleware");
const { uploadResumeImage } = require("../controllers/uploadImage");

const router = express.Router();

router.post("/", isAuthenticated, createResume);
router.get("/", isAuthenticated, getUserResumes);
router.get("/:id", isAuthenticated, getResumeById);
router.put("/:id", isAuthenticated, updateResume);
router.post("/:id/duplicate", isAuthenticated, duplicateResume);
router.put("/:id/upload-image", isAuthenticated, uploadResumeImage);
router.delete("/:id", isAuthenticated, deleteResume);

module.exports = router;