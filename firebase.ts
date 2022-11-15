// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD0OAHmK_5MUOkl48BOtARoWrZ4F8T9rTs",
  authDomain: "netflex-clone-57fb8.firebaseapp.com",
  projectId: "netflex-clone-57fb8",
  storageBucket: "netflex-clone-57fb8.appspot.com",
  messagingSenderId: "176886276688",
  appId: "1:176886276688:web:9a0e58152e929b1219e755",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();

export default app;
export { auth, db };
