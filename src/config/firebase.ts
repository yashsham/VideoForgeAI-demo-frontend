import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBWPCAfcoBjrbc1pLr_P0Abg1woq_6OqFo",
  authDomain: "videoforge-ai.firebaseapp.com",
  projectId: "videoforge-ai",
  storageBucket: "videoforge-ai.firebasestorage.app",
  messagingSenderId: "276580590636",
  appId: "1:276580590636:web:03724fff33c21741781d89",
  measurementId: "G-8895ZTMKF1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Auth
export const auth = getAuth(app);

export default app;