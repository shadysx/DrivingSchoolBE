import { View, Text, Button, StyleSheet } from 'react-native'
import React from 'react'
import { GoogleAuth } from '../firebase/firebaseConfig'

const Test = () => {
  return (
    <View style={styles.container}>
      <Text>Test</Text>
      <Button title="Sign in with Google" onPress={() => GoogleAuth()}/>
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

export default Test