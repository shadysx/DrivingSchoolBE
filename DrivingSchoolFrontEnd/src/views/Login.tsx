// iOS Google cloud clientId : 650987116196-76hpj6f7chi5qhc9fpuqe3qi9armn5ve.apps.googleusercontent.com

import { View, Text, StyleSheet, Button } from 'react-native'
import React, { useState } from 'react'
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";


const Login = () => {
  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "",
    iosClientId: "650987116196-76hpj6f7chi5qhc9fpuqe3qi9armn5ve.apps.googleusercontent.com",
    webClientId: "",
  });
  return (
    <View>
      <Text>Login</Text>
      <Button
          title="Sign in with Google"
          disabled={!request}
          onPress={() => {
            promptAsync();
          }}
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
    text: {
      fontSize: 20,
      fontWeight: "bold",
    },
    card: {
      borderWidth: 1,
      borderRadius: 15,
      padding: 15,
    },
    image: {
      width: 100,
      height: 100,
      borderRadius: 50,
    },
  });

export default Login