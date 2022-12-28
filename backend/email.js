const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_GENERATED_PASS,
  },
});

const sendConfirmationEmail = async (toEmail, token) => {
  const url = `http://localhost:8000/api/confirmation/${token}`;
  // Send email
  transporter.sendMail({
    to: toEmail,
    subject: 'Confirm your email on Bloodalyze',
    html: `Please click this email to confirm your email: <a href="${url}">${url}</a>`,
  });
};

module.exports = { sendConfirmationEmail };
