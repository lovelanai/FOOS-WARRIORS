// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAc2oJIZOs1D5abamMMEUKHG6Z3nPo8TEo",
  authDomain: "foos-warriors.firebaseapp.com",
  projectId: "foos-warriors",
  storageBucket: "foos-warriors.appspot.com",
  messagingSenderId: "299152234331",
  appId: "1:299152234331:web:942c85a777d1417a9e6c7e",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
