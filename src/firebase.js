// Import Firebase core and services
import { initializeApp } from "firebase/app";
import { getAuth, GithubAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDFO69uSqBL4EoCVpgtjd5DwKzJth3EiCA",
  authDomain: "quotekeeper-bb091.firebaseapp.com",
  projectId: "quotekeeper-bb091",
  storageBucket: "quotekeeper-bb091.appspot.com",
  messagingSenderId: "840261356075",
  appId: "1:840261356075:web:eeb90fff07c85537ecb86e",
  measurementId: "G-WKDR6TNCGF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export auth, firestore, and GitHub provider
export const auth = getAuth(app);
export const db = getFirestore(app);
export const githubProvider = new GithubAuthProvider();