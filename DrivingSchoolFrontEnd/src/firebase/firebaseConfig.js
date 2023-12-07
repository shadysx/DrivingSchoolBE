// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCH8r2525ltYSB9N5lloCW_8tOq4p9X4Vw",
  authDomain: "drivingschoolbelgium.firebaseapp.com",
  projectId: "drivingschoolbelgium",
  storageBucket: "drivingschoolbelgium.appspot.com",
  messagingSenderId: "303209116814",
  appId: "1:303209116814:web:9ba676843de749a4d6c5df",
  measurementId: "G-2RWKC6M1E7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
const provider = new GoogleAuthProvider();

