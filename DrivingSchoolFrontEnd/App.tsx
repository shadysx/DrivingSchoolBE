import { PaperProvider } from 'react-native-paper';
import Navigation, { AuthStack, GuestStack} from './src/navigation/navigation';
import * as React from 'react';
import { AppRegistry, View, StyleSheet, Button, Text } from 'react-native';
import ProfileBanner from './src/components/ProfileBanner';
import Quizz from './src/views/Quizz';
import { useEffect } from 'react';
import Login from './src/views/Login';
import Auth, { useAuth } from './src/auth/Auth';


export default function App() {


  useEffect(() => {
    console.log('Rerender App')
  })

  return (
    <PaperProvider>
      <Auth>
        <Navigation/>
        {/* <Quizz/> */}
      </Auth>
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


