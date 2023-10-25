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
  apiKey: "AIzaSyDKGLgYGDXgUlkv-BnZFrU_Jspj8wYwCMI",
  authDomain: "betiqpro.firebaseapp.com",
  projectId: "betiqpro",
  storageBucket: "betiqpro.appspot.com",
  messagingSenderId: "583792942825",
  appId: "1:583792942825:web:e589c41c4191e11c9a5a78",
  measurementId: "G-EN562LYCDQ",
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
// eslint-disable-next-line no-unused-vars
const analytics = getAnalytics(FIREBASE_APP);

// Initialize Firebase Authentication and get a reference to the service
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
