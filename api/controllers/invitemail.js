const nodemailer = require("nodemailer");
require("dotenv").config();
const CandidateResponse = require("../models/CandidateResponses");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SENDER_EMAIL_ID,
    pass: process.env.SENDER_EMAIL_APP_PASSWORD,
  },
});

async function sendMail(name, to, subject, text, html) {
  console.log("name, to, subject, text, html", name, to, subject, text, html);
  const info = await transporter.sendMail({
    from: `${name} <${process.env.SENDER_EMAIL_ID}>`,
    to,
    subject,
    text,
    html,
  });

  console.log("Message sent: %s", info);
}

const sendInviteMail = async (req, res) => {
  const { email, assessmentId } = req.body;

  console.log("email, assessmentId", email, assessmentId);
  const chechIfAlreadyInvited = await CandidateResponse.findOne({
    email,
    assessmentId:assessmentId,
  });
  if (chechIfAlreadyInvited) {
    return res.status(403).json({ error: "User already invited" });
  }
  const html = `
  <h1>Invitation to take assessment</h1>
  <p>You have been invited to take an assessment. Please click on the link to take the assessment</p>
  <br>
  <a href='http://localhost:5173/test/${assessmentId}/UserDetails?email=${email}'>Click here to take the assessment</a>
  <br>
  <p>Thanks</p>
  `;
  sendMail(
    "Test",
    email,
    "Invitation to take assessment",
    "You have been invited to take an assessment. Please click on the link to take the assessment",
    html
  );

  const invite = await CandidateResponse.create({
    email,
    assessmentId: assessmentId,
    isAttempted: false,
  });
  return res.status(200).json(invite);
};

module.exports = { sendInviteMail };
