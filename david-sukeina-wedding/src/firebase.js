// Firebase configuration
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later
const firebaseConfig = {
  apiKey: "AIzaSyBqsEm-9lgQ0uOGwqvrzQDgCvink1f1VYI",
  authDomain: "rsvp-a9d7c.firebaseapp.com",
  projectId: "rsvp-a9d7c",
  storageBucket: "rsvp-a9d7c.firebasestorage.app",
  messagingSenderId: "454941152292",
  appId: "1:454941152292:web:af4de09017bee77f91f4b1",
  measurementId: "G-M24R1KYYSJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
// Only initialize analytics in the browser
defineAnalytics();

function defineAnalytics() {
  if (typeof window !== 'undefined') {
    try {
      getAnalytics(app);
    } catch (e) {
      // Ignore analytics errors in unsupported environments
    }
  }
}

export { auth, db };
