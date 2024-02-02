import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { GoogleAuthProvider, getAuth, signInWithPopup, signInWithCredential, UserCredential } from "firebase/auth";
import { auth } from '../firebase/firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { User } from '../interfaces/interfaces';
import { API, Theme } from '../constants';

GoogleSignin.configure({
  webClientId: '303209116814-uelgcct8h7aprkq4104to8295r3ttjnj.apps.googleusercontent.com'
});

interface AuthContextType {
  user: User | null;
  handleGoogleSignIn: () => Promise<void>;
  handleLogout: () => Promise<void>;
  checkUserInAsyncStorage: () => Promise<void>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AuthContext = React.createContext<AuthContextType>({
  user: null,
  handleGoogleSignIn: async () => {},
  handleLogout: async () => {},
  checkUserInAsyncStorage: async () => {},
  isLoading: false,
  setIsLoading: () => {},
});

export function useAuth() {
  return React.useContext(AuthContext)
}

const Auth = ({ children }) => {
  const [userCredential, setUserCredential] = useState<UserCredential>()
  const [user, setUser] = useState<User | null>()
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
      console.log(API + 'Auth/VerifyGoogleToken')
    handleAuth();
  },[])

  const handleGoogleSignIn = async () => {
    const response: UserCredential = await googleSignIn(); 
    setIsLoading(true)
    const jwt = (response as any)._tokenResponse.oauthIdToken;

    try {
      const result = await axios.post(API + 'Auth/VerifyGoogleToken', jwt, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log("userData", result)
      const userData: User = result.data;
      const fetchedUser: User = {id: userData.id, email: userData.email, userName: userData.userName, savedQuestions: userData.savedQuestions};
      setUser(fetchedUser)
      await AsyncStorage.setItem("@user", JSON.stringify(userData));
      console.log('logged user', fetchedUser)
    } 
    catch (error) {
      console.error('Error making POST request:', error);
    }
    setIsLoading(false)
  }

  // Will check if there is an user in the local storage and set it if needed
  const handleAuth = async () => {
    setIsLoading(true);
    const userInCache: User = JSON.parse(await AsyncStorage.getItem("@user")); 
    if(userInCache){
      setUser(userInCache)
    }
    setIsLoading(false);
  }


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
    setIsLoading(true);
    await AsyncStorage.removeItem("@user");
    setUserCredential(null);
    setUser(null)
    setIsLoading(false);
  }

    // Render loading indicator if isLoading is true
    if (isLoading) {
      return (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={Theme.primary} />
        </View>
      );
    }
  return (
    <AuthContext.Provider value={{user, handleGoogleSignIn, handleLogout, checkUserInAsyncStorage, isLoading, setIsLoading}}>
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
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default Auth