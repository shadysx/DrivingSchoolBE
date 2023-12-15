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


export default function App() {
  const [quizzSummary, setQuizzSummary] = React.useState<QuizzSummary>();
  const [quizzSummaryElement, setQuizzSummaryElement] = React.useState<QuizzSummaryElement>();

  useEffect(() => {
    const fetchQuestionSummariesFromApi = async () => {
      console.log("fetching");
      try {
        const response = await fetch(
          "http://localhost:5143/quizsummary/getall"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const responseData: QuizzSummary[] = await response.json();
        setQuizzSummary(responseData[0]);
        setQuizzSummaryElement(responseData[0].quizzSummaryElements[0]);
        console.log(responseData[0].quizzSummaryElements[0], "Ayo")

      } catch (error: any) {
        // setError(error);
      } finally {
      }
    };
    fetchQuestionSummariesFromApi();
  }, []);

  useEffect(() => {
    console.log(quizzSummaryElement, "Yooo");
  }, [quizzSummary, quizzSummaryElement]);

  return (
    <PaperProvider>
      <Auth>
        <Navigation/>
        {/* <QuizzSummaryDetailView quizzSummaryElement={quizzSummaryElement}/> */}
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


