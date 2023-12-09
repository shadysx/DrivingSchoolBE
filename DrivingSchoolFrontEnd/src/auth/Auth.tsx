import { View, Text, Button, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { GoogleAuthProvider, getAuth, signInWithPopup, signInWithCredential, UserCredential, User} from "firebase/auth";
import { auth } from '../firebase/firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

GoogleSignin.configure({
  webClientId: '303209116814-uelgcct8h7aprkq4104to8295r3ttjnj.apps.googleusercontent.com'
});

export const AuthContext = React.createContext({
  user: null, // Assuming user is of type User or null
  handleGoogleSignIn: () => {}, // Placeholder function
  handleLogout: () => {}, // Placeholder function
  checkUserInAsyncStorage: () => {}, // Placeholder function
});

export function useAuth() {
  return React.useContext(AuthContext)
}

const Auth = ({ children }) => {
  const [userCredential, setUserCredential] = useState<UserCredential>()
  const [user, setUser] = useState<User>()

  useEffect(() => {
    handleAuth();
  },[])

  useEffect(() => {
    handleAuth();
  },[])

  const handleGoogleSignIn = async (): Promise<User>  => {
    const response: UserCredential = await googleSignIn(); 
    const jwt = (response as any)._tokenResponse.oauthIdToken;

    console.log(jwt)

    try {
      const result = await axios.post('http://localhost:5143/Auth/VerifyGoogleToken', 'hello wordl', {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(result.data); // Log the response data from the server
    } catch (error) {
      console.error('Error making POST request:', error);
    }

    return null;
  }

  // Will check if there is an user in the local storage and set it if needed
  const handleAuth = async () => {
    const userInCache: UserCredential = JSON.parse(await AsyncStorage.getItem("@user")); 
    if(userInCache){
      setUserCredential(userInCache)
      setUser(userInCache.user)
    }
  }

  // const handleGoogleSignIn = async () => {
  //   console.log("HandleSignIn")
  //   const userInCache: string = await AsyncStorage.getItem("@user");
  //   if(!userInCache){
  //     const response: UserCredential = await googleSignIn();
  //      await setUserCredential(response);
  //      await setUser(response.user)
  //      await AsyncStorage.setItem("@user", JSON.stringify(response));
  //   }
  //   else {
  //     setUserCredential(JSON.parse(userInCache))
  //     setUser(JSON.parse(userInCache).user)
  //   }
  // }

  // Return the userCredentials from firebase
  const googleSignIn = async () => {
    try {
      // Check for Google Play Services
      await GoogleSignin.hasPlayServices();
  
      // Sign in with Google
      const { idToken } = await GoogleSignin.signIn();
  
      // Use the Google ID token to authenticate with Firebase
      const googleCredentials = GoogleAuthProvider.credential(idToken);

      const firebaseSignInResult = await signInWithCredential(auth, googleCredentials);
  
      return firebaseSignInResult;

    } 
    catch (error) {
      console.error("Error in Google Sign-In: ", error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // Handle user cancelling the sign-in process
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // Handle the sign-in process already being in progress
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // Handle Google Play Services not available or outdated
      } else {
        // Handle other errors
      }
      // Optionally return a default value or throw an error
      return null; // or throw error;
    }
  };

  const checkUserInAsyncStorage = async () => {
    try {
      // Get the value for the '@user' key
      const userValue = await AsyncStorage.getItem('@user');
      if (userValue !== null) {
        // Value exists in AsyncStorage
        console.log('User data in AsyncStorage:', userValue);
      } else {
        // Value does not exist in AsyncStorage
        console.log('No user data found in AsyncStorage');
      }
    } catch (error) {
      // Error retrieving data
      console.error('Error retrieving @user data from AsyncStorage:', error);
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("@user");
    setUserCredential(null);
    setUser(null)
  }
  return (
    <AuthContext.Provider value={{user, handleGoogleSignIn, handleLogout, checkUserInAsyncStorage}}>
    {children}
  </AuthContext.Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Auth