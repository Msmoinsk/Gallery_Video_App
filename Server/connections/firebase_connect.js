// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, doc, collection, setDoc } from 'firebase/firestore';
// import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAx-JAgJJkRrYsi4WSR6TtopofthiPH5Cg",
  authDomain: "gallery-aaf91.firebaseapp.com",
  projectId: "gallery-aaf91",
  storageBucket: "gallery-aaf91.appspot.com",
  messagingSenderId: "999110837343",
  appId: "1:999110837343:web:9033c6356faf8d6c1647ea",
  measurementId: "G-K2198G08R2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const db = getFirestore(app);

// export const setUser = async (userId, data) => {
//     const userRef = doc(collection(db, 'users'), userId);
//     await setDoc(userRef, data, { merge: true });
// };

export default app