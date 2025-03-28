const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.sendNotification = functions.firestore
  .document('notifications/{notificationId}')
  .onCreate((snap, context) => {
    const notification = snap.data();
    const recipientUid = notification.recipientUid;
    const message = notification.message;

    return admin.firestore().collection('users').doc(recipientUid).get()
      .then(userDoc => {
        const user = userDoc.data();
        const token = user.fcmToken;
        if (!token) {
          console.log('No FCM token for user', recipientUid);
          return null;
        }
        const payload = {
          notification: {
            title: 'رسالة جديدة', // "New Message" in Arabic
            body: message,
            icon: '/icon.png'
          }
        };
        return admin.messaging().sendToDevice(token, payload);
      })
      .then(response => {
        console.log('Notification sent successfully:', response);
      })
      .catch(error => {
        console.log('Error sending notification:', error);
      });
  });