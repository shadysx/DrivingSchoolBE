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
import { Theme } from "../constants";
import { QuizzSummaryElement } from "../interfaces/interfaces";
import { useState } from "react";

const Stack = createStackNavigator();
export function AuthStack() {
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
          options={{ headerShown: false }}
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
              const { user } = useAuth();
              const params = route.params as {element: QuizzSummaryElement}; 
              const [icon, setIcon] = useState("bookmark-outline");
              return (
                <IconButton
                icon={icon}
                  iconColor={Theme.secondary}
                  size={30}
                  onPress={() => {
                    console.log(user)
                    user.savedQuestions.push(params.element.question);
                    console.log(user)
                    setIcon(icon === "bookmark-outline" ? "bookmark" : "bookmark-outline");
                    // Push user to server here
                  }}
                />
              );
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
