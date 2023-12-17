import { View, Text, StyleSheet, Settings } from 'react-native'
import React from 'react'
import SettingsMenu from '../components/SettingsMenu';

const TestView = () => {
  return (
    <View style={styles.container}>
      {/* <Text>TestView</Text> */}
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: 'center'
    },
  });


export default TestView