import { DataTypes } from "sequelize";
import sequelize from "../../DB/Connection.js";
import nodemailer from "nodemailer";
import UserModel from "./UserModule.js"; // استيراد نموذج المستخدم لجلب البريد الإلكتروني

const NotificationModel = sequelize.define("Notification", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "unread", // الحالة الافتراضية هي "غير مقروء"
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

// Notification class
class Notification {
  // إرسال إشعار
  static async sendNotification(userId, message) {
    try {
      // حفظ الإشعار في قاعدة البيانات
      const notification = await NotificationModel.create({
        userId,
        message,
      });

      // إرسال بريد إلكتروني اختياري
      await this.sendEmailNotification(userId, message);

      return notification;
    } catch (error) {
      throw new Error("Error sending notification: " + error.message);
    }
  }

  // الحصول على جميع الإشعارات لمستخدم
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

  // حذف إشعار
  static async deleteNotification(notificationId) {
    try {
      const result = await NotificationModel.destroy({
        where: { id: notificationId },
      });
      return result > 0;
    } catch (error) {
      throw new Error("Error deleting notification: " + error.message);
    }
  }

  // تحديث حالة الإشعار
  static async updateNotificationStatus(notificationId, status) {
    try {
      const [updatedRows] = await NotificationModel.update(
        { status },
        { where: { id: notificationId } }
      );
      return updatedRows > 0;
    } catch (error) {
      throw new Error("Error updating notification status: " + error.message);
    }
  }

  // إرسال بريد إلكتروني للإشعار
  static async sendEmailNotification(userId, message) {
    try {
      // جلب البريد الإلكتروني للمستخدم
      const user = await UserModel.findByPk(userId);
      if (!user || !user.email) {
        throw new Error("User not found or email missing");
      }

      // إعداد nodemailer
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: "New Notification",
        text: message,
      };

      // إرسال البريد الإلكتروني
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error("Error sending email notification:", error.message);
      throw new Error("Failed to send email notification");
    }
  }
}

export default Notification;
