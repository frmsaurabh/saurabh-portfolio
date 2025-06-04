// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD6U-8JNZuVcjPmaa2880_sK-8081fInCY",
  authDomain: "saurabh-portfolio-blog.firebaseapp.com",
  projectId: "saurabh-portfolio-blog",
  storageBucket: "saurabh-portfolio-blog.firebasestorage.app",
  messagingSenderId: "106085981966",
  appId: "1:106085981966:web:985ab5279dadb2d84b415f"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
