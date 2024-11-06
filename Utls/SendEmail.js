import nodemailer from "nodemailer";

export const sendEmail = async (to, subject, text, fromName, replyTo) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "bookbliss24@gmail.com",
      pass: "tulj uanb ztet jugi",
    },
  });

  const mailOptions = {
    from: `${fromName} <${process.env.EMAIL_USER}>`, // Display name as owner
    to,
    subject,
    text,
    replyTo: replyTo || "bookbliss24@gmail.com", // Owner's email for replies
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to} successfully`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
