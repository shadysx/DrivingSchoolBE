import { PaperProvider } from 'react-native-paper';
import AuthStack from './src/navigation/navigation';
import * as React from 'react';
import { AppRegistry, View, StyleSheet } from 'react-native';
import ProfileBanner from './src/components/ProfileBanner';


export default function App() {
  return (
    <PaperProvider>
        <AuthStack/>
    </PaperProvider>
  );
}


