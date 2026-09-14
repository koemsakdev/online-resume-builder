const express = require("express");
const {
    register,
    login,
    socialLogin,
    googleAuth,
    logout,
    getUserProfile
} = require("../controllers/authController");
const { isAuthenticated } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

const router = express.Router();

// Auth routes
router.post("/register", register);
router.post("/login", login);
router.post("/google", googleAuth);
router.post("/social-login", socialLogin);
router.post("/oauth", socialLogin); // Alias
router.get("/logout", logout);
router.get("/profile", isAuthenticated, getUserProfile);

router.post("/upload-image", upload.single("image"), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }
    const imageUlr = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    res.status(200).json({ imageUrl: imageUlr });
});

module.exports = router;