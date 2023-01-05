// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQKsNEWwD4zJKYVeVJqjrgHOGW2lafjGc",
  authDomain: "fooswarriors-bdc5e.firebaseapp.com",
  projectId: "fooswarriors-bdc5e",
  storageBucket: "fooswarriors-bdc5e.appspot.com",
  messagingSenderId: "189499908108",
  appId: "1:189499908108:web:ffcc8722ea06135cdf8e29",
  measurementId: "G-VYTMQDTRDZ",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
