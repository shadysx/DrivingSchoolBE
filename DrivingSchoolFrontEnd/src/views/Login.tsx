import { View, Text, Button, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';

const Login = () => {
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