import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, useRoute } from "@react-navigation/native";
import { useAuth } from "../auth/Auth";

//Screens

import QuizzView from "../views/QuizzView";
import QuizzSummaryView from "../views/QuizzSummaryView";
import HomeView from "../views/HomeView";
import LoginView from "../views/LoginView";
import QuizzSummaryDetailView from "../views/QuizzSummaryDetailView";
import { Button, IconButton } from "react-native-paper";
import { API, Theme } from "../constants";
import { QuizzSummaryElement, User } from "../interfaces/interfaces";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import BookmarkButton from "../components/BookmarkButton";
import FavoritesView from "../views/FavoritesView";

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
  return user ? <AuthStack /> : <GuestStack />;
};

export default Navigation;
