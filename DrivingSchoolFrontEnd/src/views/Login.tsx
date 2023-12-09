import { View, Text, Button, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
// 650987116196-76hpj6f7chi5qhc9fpuqe3qi9armn5ve.apps.googleusercontent.com
import { GoogleSignin, GoogleSigninButton} from '@react-native-google-signin/google-signin';
import { GoogleAuthProvider, signInWithCredential } from '@firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const webClientId = '303209116814-uelgcct8h7aprkq4104to8295r3ttjnj.apps.googleusercontent.com'
// const iosClientId = '650987116196-76hpj6f7chi5qhc9fpuqe3qi9armn5ve.apps.googleusercontent.com'

GoogleSignin.configure({
  webClientId: '303209116814-uelgcct8h7aprkq4104to8295r3ttjnj.apps.googleusercontent.com'
});

const Login = () => {
  const [statusCodes, setstatusCodes] = useState()
  const [userInfo, setUserInfo] = useState()

  useEffect(() => {
  })

  const getUserInfo = async (token) => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const user = await response.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);
    } catch (error) {
      // Add your own error handler here
    }
  };
  
  return (
    <View style={styles.container}>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide} 
        color={GoogleSigninButton.Color.Dark}
      />
      
    </View>
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

export default Login