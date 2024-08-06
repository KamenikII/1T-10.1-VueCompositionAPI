// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase-admin/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6TTYJ_AGe-8paXwk1a5nOAf1-ftiBYlc",
  authDomain: "todolist-3ac15.firebaseapp.com",
  projectId: "todolist-3ac15",
  storageBucket: "todolist-3ac15.appspot.com",
  messagingSenderId: "164961559755",
  appId: "1:164961559755:web:ca15403d9d450c41ec274e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {
    db
}