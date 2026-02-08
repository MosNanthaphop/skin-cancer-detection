// src/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// --- เอา config ที่ได้จาก Firebase Console มาวางทับตรงนี้ ---
const firebaseConfig = {
  apiKey: "AIzaSyBXozAZtZ8ega0ubfa3RscPb9f2jH4re5E",
  authDomain: "skindee-project.firebaseapp.com",
  projectId: "skindee-project",
  storageBucket: "skindee-project.firebasestorage.app",
  messagingSenderId: "531269882062",
  appId: "1:531269882062:web:31504c25d5dffe39c0809f",
  databaseURL:
    "https://skindee-project-default-rtdb.asia-southeast1.firebasedatabase.app",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Realtime Database
export const db = getDatabase(app);
