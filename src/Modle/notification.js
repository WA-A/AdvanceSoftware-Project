const db = require('c:/Users/ragha/Desktop/RentItOut/AdvanceSoftware-Project/src/Modle/ItemModel');

class Notification {
    // Send a notification
    static sendNotification(userId, message, callback) {
        const query = "INSERT INTO Notifications (user_id, message, created_at) VALUES (?, ?, NOW())";
        db.query(query, [userId, message], (error, results) => {
            if (error) {
                return callback(error);
            }
            callback(null, results);
        });
    }

    // Get all notifications for a user
    static getUserNotifications(userId, callback) {
        const query = "SELECT * FROM Notifications WHERE user_id = ? ORDER BY created_at DESC";
        db.query(query, [userId], (error, results) => {
            if (error) {
                return callback(error);
            }
            callback(null, results);
        });
    }

    // Delete a notification
    static deleteNotification(notificationId, callback) {
        const query = "DELETE FROM Notifications WHERE id = ?";
        db.query(query, [notificationId], (error, results) => {
            if (error) {
                return callback(error);
            }
            callback(null, results);
        });
    }

    // Update notification status (optional)
    static updateNotificationStatus(notificationId, status, callback) {
        const query = "UPDATE Notifications SET status = ? WHERE id = ?";
        db.query(query, [status, notificationId], (error, results) => {
            if (error) {
                return callback(error);
            }
            callback(null, results);
        });
    }
}

module.exports = Notification;
