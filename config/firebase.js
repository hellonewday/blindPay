// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAGjNwKYut3Of03C_YpCoF4xKaOWW66Gm4",
  authDomain: "blindpay-demo.firebaseapp.com",
  projectId: "blindpay-demo",
  storageBucket: "blindpay-demo.appspot.com",
  messagingSenderId: "104848539114",
  appId: "1:104848539114:web:2cdf03ee25ed31ab0a0693",
  measurementId: "G-4ESF4DQWCP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
