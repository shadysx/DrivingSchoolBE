import { PaperProvider } from 'react-native-paper';
import AuthStack from './src/navigation/navigation';
import * as React from 'react';
import { AppRegistry, View, StyleSheet, Button, Text } from 'react-native';
import ProfileBanner from './src/components/ProfileBanner';
import Quizz from './src/views/Quizz';
import { useEffect } from 'react';
import Test from './src/views/Test';


export default function App() {

  useEffect(() => {
    console.log('Rerender App')
  })

  return (
    <PaperProvider>
        <AuthStack/>
    </PaperProvider>
  );   
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})


