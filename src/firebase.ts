import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB_iBBbojfGSMbGBWU-WD6MmdmA-rzMyPA",
  authDomain: "campusxchange-d1528.firebaseapp.com",
  projectId: "campusxchange-d1528",
  storageBucket: "campusxchange-d1528.firebasestorage.app",
  messagingSenderId: "796660091819",
  appId: "1:796660091819:web:8d912e7d68b62b6947e0ee"
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export default app;