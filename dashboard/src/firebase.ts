// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCH8r2525ltYSB9N5lloCW_8tOq4p9X4Vw",
  authDomain: "drivingschoolbelgium.firebaseapp.com",
  projectId: "drivingschoolbelgium",
  storageBucket: "drivingschoolbelgium.appspot.com",
  messagingSenderId: "303209116814",
  appId: "1:303209116814:web:07125468250115add6c5df",
  measurementId: "G-KDP32C8TE2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Create a root reference
const storage = getStorage();

// Create a reference to 'mountains.jpg'
const questionsRef = ref(storage, 'images/image.png');


    export const handleUploadImage = async () => {
      try {
        // Fetch the image file
        const response = await fetch('./avatar.png');
        const blob = await response.blob();
  
        // Upload the blob to Firebase Storage
        const snapshot = await uploadBytes(questionsRef, blob);
        console.log('Uploaded a blob or file!', snapshot);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    };