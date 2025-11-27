import express from "express";
import { transporter } from "../config/mail.js";

const router = express.Router();

// routes
router.post("/", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const subscriberMail = {
      from: {
        name: "Restaurant",
        address: process.env.MAIL_USER,
      },
      to: email,
      subject: "Subscription Confirmation",
      html: `
        <h3>Thank you for subscribing!</h3>
        <p>Hi,</p>
        <p>You have successfully subscribed to our newsletter.</p>
        <p>We will keep you updated with our latest dishes, offers, and events.</p>
        <br/>
        <p>Regards,<br/>Restaurant Team</p>
      `,
    };

    const adminMail = {
      from: {
        name: "Website Notification",
        address: process.env.MAIL_USER,
      },
      to: process.env.MAIL_USER,
      subject: "New Newsletter Subscriber",
      html: `
        <h3>New Subscriber</h3>
        <p><b>Email:</b> ${email}</p>
      `,
    };

    await transporter.sendMail(subscriberMail);
    await transporter.sendMail(adminMail);

    return res.status(200).json({ message: "Emails sent successfully" });

  } catch (error) {
    console.error("Mail Error:", error);
    return res.status(500).json({
      message: "Failed to send emails",
      error: error.message,
    });
  }
});

export default router;
