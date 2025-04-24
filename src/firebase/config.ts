// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { firebaseConfig } from "./key";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBCwl6JatmYrQIRNkLdz1vTe_8-m845I7A",

//   authDomain: "astro-auth-5cc4f.firebaseapp.com",

//   projectId: "astro-auth-5cc4f",

//   storageBucket: "astro-auth-5cc4f.firebasestorage.app",

//   messagingSenderId: "180284056144",

//   appId: "1:180284056144:web:0e8592b5e1e51e5abbe755",
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
auth.languageCode = "en";

export const firebase = {
  app,
  auth,
};
