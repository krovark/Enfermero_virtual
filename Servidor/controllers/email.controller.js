const { startEmailScheduler } = require('../models/email.model');

const startEmailSchedulerController = async (req, res) => {
  try {
    const { recipient, subject, message, interval } = req.params;

    const result = await startEmailScheduler(recipient, subject, message, interval);
    res.json(result);
  } catch (error) {
    console.error('Error in controller:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};

module.exports = { startEmailSchedulerController };