// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
// import { getReactNativePersistence } from "firebase/auth";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-rpvtLEuml2fgkzvzG4ehLgRW90Tfamw",
  authDomain: "betiqprohub.firebaseapp.com",
  projectId: "betiqprohub",
  storageBucket: "betiqprohub.appspot.com",
  messagingSenderId: "585366236424",
  appId: "1:585366236424:web:e9ca1106c6d12c406590bd",
  measurementId: "G-M8VTV5CWCT",
};

// const reactNativePersistence = firebaseAuth.getReactNativePersistence;
// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);

// // Get Firebase Analytics instance
// const analytics = getAnalytics(FIREBASE_APP);

// // Example: Track a custom event
// analytics.logEvent("button_click", {
//   button_name: "example_button",
//   page: "example_page",
// });

// // You can track more events or user interactions here

// Initialize Firebase Authentication and get a reference to the service
// export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
// Set up AsyncStorage persistence
// FIREBASE_AUTH.setPersistence(getAuth.Auth.Persistence.LOCAL);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
