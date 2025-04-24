// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
//msg:'Get config from Firebase console'
const firebaseConfig = {};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
auth.languageCode = "en";

export const firebase = {
  app,
  auth,
};
