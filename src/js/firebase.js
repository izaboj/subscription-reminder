import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyALuqYLRMz10nv1mpbEwjg6NQowPBbMiBQ",
  authDomain: "subscription-reminder-5d2a3.firebaseapp.com",
  databaseURL:
    "https://subscription-reminder-5d2a3-default-rtdb.firebaseio.com",
  projectId: "subscription-reminder-5d2a3",
  storageBucket: "subscription-reminder-5d2a3.appspot.com",
  messagingSenderId: "1056071349669",
  appId: "1:1056071349669:web:f15664cd91f736a122e44c",
  measurementId: "G-JPKFG2HTWX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
export { db, auth };
