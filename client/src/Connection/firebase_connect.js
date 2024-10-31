// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBR0HfkBn43mC1_PYhcBz-QDmcqGrCLv5o",
  authDomain: "msk-gallery.firebaseapp.com",
  projectId: "msk-gallery",
  storageBucket: "msk-gallery.appspot.com",
  messagingSenderId: "764964006386",
  appId: "1:764964006386:web:c7a3ccf1b421abedbb636b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app