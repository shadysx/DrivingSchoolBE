
import 'react-native-gesture-handler';
import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, useRoute } from "@react-navigation/native";
import { useAuth } from "../auth/Auth";

//Screens

import QuizzView from "../views/QuizzView";
import QuizzSummaryView from "../views/QuizzSummaryView";
import HomeView from "../views/HomeView";
import LoginView from "../views/LoginView";
import QuizzSummaryDetailView from "../views/QuizzSummaryDetailView";
import BookmarkButton from "../components/BookmarkButton";
import FavoritesView from "../views/FavoritesView";
import AboutUsView from "../views/AboutUsView";
import ContactView from "../views/ContactView";
import StatsViewContainer from '../views/Stats/StatsViewContainer';

const Stack = createStackNavigator();
export function AuthStack() {
  const { user } = useAuth();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeView">
        <Stack.Screen
          name="QuizzView"
          component={QuizzView}
          options={{
            headerShown: false,
            title: "Quizz",
          }}
        />
        <Stack.Screen
          name="ContactView"
          component={ContactView}
          options={{ headerShown: true}}
        />
        <Stack.Screen
          name="AboutUsView"
          component={AboutUsView}
          options={{ headerShown: true, headerBackTitle: "Accueil", title: "A propos de nous"}}
        />
        <Stack.Screen
          name="HomeView"
          component={HomeView}
          options={{ headerShown: false}}
        />
        <Stack.Screen
          name="FavoritesView"
          component={FavoritesView}
          options={{ headerShown: true, headerBackTitle: "Accueil", title: "Favoris" }}
        />
        <Stack.Screen
          name="QuizzSummaryView"
          component={QuizzSummaryView}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="StatsViewContainer"
          component={StatsViewContainer}
          options={{ headerShown: true, headerBackTitle: "Accueil", title: "Statistiques" }}
        />
        <Stack.Screen
          name="QuizzSummaryDetailView"
          component={QuizzSummaryDetailView}
          options={({ route }) => ({
            //TODO: Make a component for this
            headerRight: () => {
              return <BookmarkButton route={route} user={user} />;
            },
            title: "Résumé du quizz",
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export function GuestStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginView">
        <Stack.Screen
          name="LoginView"
          component={LoginView}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Navigation = () => {
  const { user } = useAuth();
  return user ? <AuthStack /> : <GuestStack/>;
};

export default Navigation;
