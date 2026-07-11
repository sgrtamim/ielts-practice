// Firebase App
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";

// Firestore
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    doc,
    getDoc,
    updateDoc,
    deleteDoc
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBS4nm0YihdvgDPi7qVPgKxD6vBe8v1w34",
    authDomain: "sgr-ielts.firebaseapp.com",
    projectId: "sgr-ielts",
    storageBucket: "sgr-ielts.firebasestorage.app",
    messagingSenderId: "525558458825",
    appId: "1:525558458825:web:fa3fc1c6b19c700db66018"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Export everything
export {
    db,
    collection,
    addDoc,
    getDocs,
    doc,
    getDoc,
    updateDoc,
    deleteDoc
};