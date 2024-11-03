import DeliveryModel from "../Modle/DeliveryModel.js";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const createDelivery = async (req, res) => {
  try {
    const { rentalId, userId, tenantAddress, ownerAddress, deliveryAddress, deliveryMethod } = req.body;

    const newDelivery = await DeliveryModel.create({
      rentalId,
      userId,
      tenantAddress,
      ownerAddress,
      deliveryAddress,
      deliveryMethod,
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: `${tenantAddress}, ${ownerAddress}`,
      subject: "Delivery Update - RentItOut",
      text: `A new delivery is scheduled:\n\n- Rental ID: ${rentalId}\n- Delivery Method: ${deliveryMethod}\n- Delivery Address: ${deliveryAddress}\n\nThank you for using RentItOut!`,
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
    console.error("Failed to create delivery:", error);
    res.status(500).json({ message: "Failed to create delivery", error: error.message });
  }
};
