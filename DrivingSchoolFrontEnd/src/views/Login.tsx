import { View, Text, Button, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { useAuth } from '../auth/Auth';

const Login = () => {
  const { user, handleGoogleSignIn, handleLogout, checkUserInAsyncStorage} = useAuth();


  useEffect(() => {
    console.log("DummyValue ")
  })

  return (
    <View style={styles.container}>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide} 
        color={GoogleSigninButton.Color.Dark}
        onPress={() => handleGoogleSignIn()}
      />
      {user && <Text>Welcome {user.displayName}</Text>}
      <Button title="Log Out" onPress={() => handleLogout()}/>
      <Button title="Check Cache" onPress={() => checkUserInAsyncStorage()}/>
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