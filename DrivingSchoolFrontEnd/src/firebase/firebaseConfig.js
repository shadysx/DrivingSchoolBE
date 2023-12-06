// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries
// import { GoogleAuthProvider } from "firebase/auth";


// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCH8r2525ltYSB9N5lloCW_8tOq4p9X4Vw",
//   authDomain: "drivingschoolbelgium.firebaseapp.com",
//   projectId: "drivingschoolbelgium",
//   storageBucket: "drivingschoolbelgium.appspot.com",
//   messagingSenderId: "303209116814",
//   appId: "1:303209116814:web:9ba676843de749a4d6c5df",
//   measurementId: "G-2RWKC6M1E7"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);


// const auth = getAuth();
// const provider = new GoogleAuhProvider();

// export const GoogleAuth = () => {
//     signInWithPopup(auth, provider)
//     .then((result) => {
//         console.log(result)
//       // This gives you a Google Access Token. You can use it to access the Google API.
//       const credential = GoogleAuthProvider.credentialFromResult(result);
//       const token = credential.accessToken;
//       // The signed-in user info.
//       const user = result.user;
//       // IdP data available using getAdditionalUserInfo(result)
//       // ...
//     }).catch((error) => {
//       // Handle Errors here.
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       // The email of the user's account used.
//       const email = error.customData.email;
//       // The AuthCredential type that was used.
//       const credential = GoogleAuthProvider.credentialFromError(error);
//       // ...
//     });
// }