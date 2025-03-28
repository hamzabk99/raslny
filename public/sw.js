importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyA3h2VF-GeE_AKjKcsbDF-zw1n1Y9Z_ckA",
  authDomain: "web-chat-eaa23.firebaseapp.com",
  projectId: "web-chat-eaa23",
  storageBucket: "web-chat-eaa23.firebasestorage.app",
  messagingSenderId: "640664372760",
  appId: "1:640664372760:web:8b44f49ac91a4465b1256d"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/icon.png'
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/') // Open the app when clicked
  );
});