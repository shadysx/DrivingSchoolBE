import "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import Navigation, { AuthStack, GuestStack } from "./src/navigation/navigation";
import * as React from "react";
import { AppRegistry, View, StyleSheet, Button, Text } from "react-native";
import ProfileBanner from "./src/components/ProfileBanner";
import Quizz from "./src/views/QuizzView";
import { useEffect } from "react";
import Login from "./src/views/LoginView";
import Auth, { useAuth } from "./src/auth/Auth";
import QuizzSummaryDetailView from "./src/views/QuizzSummaryDetailView";
import { QuizzSummary, QuizzSummaryElement } from "./src/interfaces/interfaces";
import TestView from "./src/views/TestView";
import HomeView from "./src/views/HomeView";
import { NavigationContainer } from "@react-navigation/native";
import BookmarkButton from "./src/components/BookmarkButton";
import AboutUsView from "./src/views/AboutUsView";
import ContactView from "./src/views/ContactView";
import FavoritesView from "./src/views/FavoritesView";
import QuizzSummaryView from "./src/views/QuizzSummaryView";
import QuizzView from "./src/views/QuizzView";
import { createStackNavigator } from "@react-navigation/stack";

export default function App() {
  const [quizzSummary, setQuizzSummary] = React.useState<QuizzSummary>();
  const [quizzSummaryElement, setQuizzSummaryElement] =
    React.useState<QuizzSummaryElement>();

  const Stack = createStackNavigator();
  return (
    <PaperProvider>
      <Auth>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="HomeView">
            <Stack.Screen
              name="ContactView"
              component={ContactView}
              options={{ headerShown: true }}
            />

            <Stack.Screen
              name="HomeView"
              component={HomeView}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Auth>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
