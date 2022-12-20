// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCH1SLqHXWgQNiB_9LIcy7sL2WrVyWAw_g",
  authDomain: "creative-minds-react.firebaseapp.com",
  projectId: "creative-minds-react",
  storageBucket: "creative-minds-react.appspot.com",
  messagingSenderId: "827641842124",
  appId: "1:827641842124:web:e2100c31addd5774233569"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);