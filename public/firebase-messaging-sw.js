importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyA3h2VF-GeE_AKjKcsbDF-zw1n1Y9Z_ckA",
  authDomain: "web-chat-eaa23.firebaseapp.com",
  projectId: "web-chat-eaa23",
  storageBucket: "web-chat-eaa23.firebasestorage.app",
  messagingSenderId: "640664372760",
  appId: "1:640664372760:web:8b44f49ac91a4465b1256d"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message:', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: 'https://www.google.com/favicon.ico'
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});