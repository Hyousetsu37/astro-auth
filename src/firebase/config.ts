// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBH3fKGO5EVjlzY0vJGChNU405e4nQeibI",
  authDomain: "astro-auth-61e2b.firebaseapp.com",
  projectId: "astro-auth-61e2b",
  storageBucket: "astro-auth-61e2b.firebasestorage.app",
  messagingSenderId: "1023681240268",
  appId: "1:1023681240268:web:855bfd9bc02c8866f77669",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
auth.languageCode = "en";

export const firebase = {
  app,
  auth,
};
