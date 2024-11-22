// Import the necessary Firebase modules
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB74Vommbzr7SaeN_Apu4qrOEo-uB_FEmo",
  authDomain: "employeeapp-bae20.firebaseapp.com",
  projectId: "employeeapp-bae20",
  storageBucket: "employeeapp-bae20.firebasestorage.app",
  messagingSenderId: "562671049211",
  appId: "1:562671049211:web:a8767d4d2b559b7b5b135e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
const auth = getAuth(app);

// Export the auth methods
export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword };
export default app;
export const db = getFirestore(app);
