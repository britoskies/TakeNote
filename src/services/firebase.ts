// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCk0FFyM6_DfNQfBWD-EAGcp9zaDB64eG0",
  authDomain: "takenote-3cc4d.firebaseapp.com",
  projectId: "takenote-3cc4d",
  storageBucket: "takenote-3cc4d.appspot.com",
  messagingSenderId: "289682201676",
  appId: "1:289682201676:web:18361dd9dc086b7bd668e9",
  measurementId: "G-D6KHGTFS07",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
