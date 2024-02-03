import { PaperProvider } from 'react-native-paper';
import Navigation, { AuthStack, GuestStack} from './src/navigation/navigation';
import * as React from 'react';
import { AppRegistry, View, StyleSheet, Button, Text } from 'react-native';
import ProfileBanner from './src/components/ProfileBanner';
import Quizz from './src/views/QuizzView';
import { useEffect } from 'react';
import Login from './src/views/LoginView';
import Auth, { useAuth } from './src/auth/Auth';
import QuizzSummaryDetailView from './src/views/QuizzSummaryDetailView';
import { QuizzSummary, QuizzSummaryElement } from './src/interfaces/interfaces';
import TestView from './src/views/TestView';
import HomeView from './src/views/HomeView';
import 'react-native-gesture-handler';

export default function App() {
  const [quizzSummary, setQuizzSummary] = React.useState<QuizzSummary>();
  const [quizzSummaryElement, setQuizzSummaryElement] = React.useState<QuizzSummaryElement>();

  return (
    <PaperProvider>
      <Auth>
        <Navigation/>
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


