const express = require('express');
const authRoutes = require('./authRoutes');
const resumeRoutes = require('./resumeRoutes');
const aiRouter = require('./aiRouter');

const router = express.Router();

// Health check endpoint
router.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Mount modules
router.use('/auth', authRoutes);
router.use('/resume', resumeRoutes);
router.use('/resumes', resumeRoutes); // RESTful alias
router.use('/ai', aiRouter);

module.exports = router;

