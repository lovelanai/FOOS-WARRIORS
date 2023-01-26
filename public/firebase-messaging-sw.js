// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: `REPLACE_WITH_YOUR_FIREBASE_MESSAGING_API_KEY`,
  authDomain: `REPLACE_WITH_YOUR_FIREBASE_MESSAGING_AUTH_DOMAIN`,
  projectId: `REPLACE_WITH_YOUR_FIREBASE_MESSAGING_PROJECT_ID`,
  storageBucket: `REPLACE_WITH_YOUR_FIREBASE_MESSAGING_STORAGE_BUCKET`,
  messagingSenderId: `REPLACE_WITH_YOUR_FIREBASE_MESSAGING_SENDER_ID`,
  appId: `REPLACE_WITH_YOUR_FIREBASE_MESSAGING_APP_ID`,
  measurementId: `REPLACE_WITH_YOUR_FIREBASE_MESSAGING_MEASUREMENT_ID`,
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);
  // Customize notification here

  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    icon: "https://firebasestorage.googleapis.com/v0/b/fooswarriors-bdc5e.appspot.com/o/maskedLogo.svg?alt=media&token=a003d848-0fdd-42f7-b10c-7cb4485c5137",
    badge:
      "https://firebasestorage.googleapis.com/v0/b/fooswarriors-bdc5e.appspot.com/o/maskedLogo.svg?alt=media&token=a003d848-0fdd-42f7-b10c-7cb4485c5137",
    data: {
      click_action: payload.data.click_action,
    },
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("notificationclick", function (event) {
  console.log(event.notification);
  var action_click = event.notification.data.click_action;
  event.notification.close();

  event.waitUntil(clients.openWindow(action_click));
});
