// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { GoogleAuthProvider, getAuth, signInWithPopup, signInWithCredential} from "firebase/auth";
import { GoogleSignin } from '@react-native-google-signin/google-signin';

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

export const auth = getAuth();
const provider = new GoogleAuthProvider();

export const googleSignIn = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const { idToken } = await GoogleSignin.signIn();
    const googleCredentials = GoogleAuthProvider.credential(idToken);
    console.log("first   ", idToken, googleCredentials)
    const result = await signInWithCredential(auth, googleCredentials);
    console.log("second", JSON.stringify(result.user.stsTokenManager.accessToken, null, 4))

    return result;
    
  } catch (error) {
    console.log(error)
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // operation (e.g. sign in) is in progress already
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available or outdated
    } else {
      // some other error happened
    }
  }
};
