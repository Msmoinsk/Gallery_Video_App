// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, doc, collection, setDoc } from 'firebase/firestore';
// import { getAnalytics } from "firebase/analytics";

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
// const analytics = getAnalytics(app);

const db = getFirestore(app);

// export const setUser = async (userId, data) => {
//     const userRef = doc(collection(db, 'users'), userId);
//     await setDoc(userRef, data, { merge: true });
// };

export default app