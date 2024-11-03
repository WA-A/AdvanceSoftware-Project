import DeliveryModel from "../Modle/DeliveryModel.js";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Create a new delivery entry and send notification email
export const createDelivery = async (req, res) => {
  try {
    const { rentalId, userId, tenantAddress, ownerAddress, deliveryAddress } = req.body;

    const newDelivery = await DeliveryModel.create({
      rentalId,
      userId,
      tenantAddress,
      ownerAddress,
      deliveryAddress,
    });

    // Send email to both tenant and owner
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: `${tenantAddress}, ${ownerAddress}`,
      subject: "Delivery Update - RentItOut",
      text: `A new delivery is scheduled. Rental ID: ${rentalId}, Delivery Address: ${deliveryAddress}.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });

    res.status(201).json(newDelivery);
  } catch (error) {
    res.status(500).json({ message: "Failed to create delivery", error: error.message });
  }
};
