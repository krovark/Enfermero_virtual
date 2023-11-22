const nodemailer = require('nodemailer');
const schedule = require('node-schedule');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your_email@gmail.com',
    pass: 'your_password',
  },
});

const sendEmail = async (recipient, subject, message) => {
  try {
    const mailOptions = {
      from: 'your_email@gmail.com',
      to: recipient,
      subject: subject,
      text: message,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    return { success: true, message: 'Email sent successfully.' };
  } catch (error) {
    console.error('Error:', error);
    return { success: false, message: 'Failed to send email.' };
  }
};

const startEmailScheduler = async (recipient, subject, message, intervalInHours) => {
  try {
    const intervalInMillis = intervalInHours * 60 * 60 * 1000; // Convert hours to milliseconds

    const emailSchedule = schedule.scheduleJob(`*/${intervalInHours} * * * *`, async () => {
      const result = await sendEmail(recipient, subject, message);
      console.log(`Email sent every ${intervalInHours} hours. Result:`, result);
    });

    return { success: true, message: 'Email scheduler started successfully.' };
  } catch (error) {
    console.error('Error starting email scheduler:', error);
    return { success: false, message: 'Failed to start email scheduler.' };
  }
};

module.exports = { sendEmail, startEmailScheduler };