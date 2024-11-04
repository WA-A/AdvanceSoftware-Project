import { DataTypes } from "sequelize";
import sequelize from "../config/database.js"; 
import nodemailer from "nodemailer";


const NotificationModel = sequelize.define("Notification", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

// Notification class
class Notification {
  // Send a notification
  static async sendNotification(userId, message) {
    try {
      // Save notification to the database
      const notification = await NotificationModel.create({
        userId,
        message,
      });
      // Optionally send email notification
      await this.sendEmailNotification(userId, message);
      return notification;
    } catch (error) {
      throw new Error("Error sending notification: " + error.message);
    }
  }

  // Get all notifications for a user
  static async getUserNotifications(userId) {
    try {
      return await NotificationModel.findAll({
        where: { userId },
        order: [["createdAt", "DESC"]],
      });
    } catch (error) {
      throw new Error("Error retrieving notifications: " + error.message);
    }
  }

  // Delete a notification
  static async deleteNotification(notificationId) {
    try {
      const result = await NotificationModel.destroy({
        where: { id: notificationId },
      });
      return result;
    } catch (error) {
      throw new Error("Error deleting notification: " + error.message);
    }
  }

  // Optional: Update notification status
  static async updateNotificationStatus(notificationId, status) {
    try {
      const result = await NotificationModel.update(
        { status },
        { where: { id: notificationId } }
      );
      return result;
    } catch (error) {
      throw new Error("Error updating notification status: " + error.message);
    }
  }

  // Send email notification
  static async sendEmailNotification(userId, message) {
    // Fetch user email from your user model (assumed to be implemented)
    const user = await UserModel.findByPk(userId);
    if (!user || !user.email) {
      throw new Error("User not found or email missing");
    }

    // Configure nodemailer
    const transporter = nodemailer.createTransport({
      service: "Gmail", 
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password or app-specific password
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "New Notification",
      text: message,
    };

    // Send email
    return transporter.sendMail(mailOptions);
  }
}

export default Notification;
