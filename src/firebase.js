// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAthhB7GNgmHpbcIq_8DjgEMre8VWFkY7Q",
  authDomain: "samar-e8d89.firebaseapp.com",
  databaseURL: "https://samar-e8d89-default-rtdb.firebaseio.com",
  projectId: "samar-e8d89",
  storageBucket: "samar-e8d89.firebasestorage.app",
  messagingSenderId: "961964309788",
  appId: "1:961964309788:web:2a295ac2d29892726bced9",
  measurementId: "G-8J63CMDBWM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app); 
const auth = getAuth(app);

export {db,analytics,auth};