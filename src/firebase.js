// Import Firebase core and services
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Optional: Analytics (only if needed)

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDFO69uSqBL4EoCVpgtjd5DwKzJth3EiCA",
  authDomain: "quotekeeper-bb091.firebaseapp.com",
  projectId: "quotekeeper-bb091",
  storageBucket: "quotekeeper-bb091.appspot.com", // ✅ corrected domain
  messagingSenderId: "840261356075",
  appId: "1:840261356075:web:eeb90fff07c85537ecb86e",
  measurementId: "G-WKDR6TNCGF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Optional: Initialize analytics (only if needed)

// Export auth and firestore
export const auth = getAuth(app);
export const db = getFirestore(app);







