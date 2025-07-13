// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "faz-mern-estate.firebaseapp.com",
  projectId: "faz-mern-estate",
  storageBucket: "faz-mern-estate.firebasestorage.app",
  messagingSenderId: "382235446926",
  appId: "1:382235446926:web:faafdc7c7b4e93dc6183df"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);