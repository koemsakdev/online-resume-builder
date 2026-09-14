const express = require("express");
const router = express.Router();
const {
  generateResumeDescription,
  getReplyFromAi,
} = require("../controllers/aiController");

router.post("/generate-description", generateResumeDescription);
router.post("/chat", getReplyFromAi);

module.exports = router;

