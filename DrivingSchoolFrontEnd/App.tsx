import { PaperProvider } from 'react-native-paper';
import AuthStack from './src/navigation/navigation';
import * as React from 'react';
import { AppRegistry } from 'react-native';


export default function App() {
  return (
    <PaperProvider>
      <AuthStack/>
    </PaperProvider>
  );
}
