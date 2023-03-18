import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCJwKLyxFIBffNWnpZOwTfD0voyhy9zjlY",
  authDomain: "miniblog-d008e.firebaseapp.com",
  projectId: "miniblog-d008e",
  storageBucket: "miniblog-d008e.appspot.com",
  messagingSenderId: "904880626445",
  appId: "1:904880626445:web:f92838b8593dc501d72e44"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore();

export { auth, db };
