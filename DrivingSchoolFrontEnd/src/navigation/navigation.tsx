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
              const initialIcon = user.savedQuestions && user.savedQuestions.some(q => q.id === params.element.question.id) 
              ? "bookmark" 
              : "bookmark-outline";
              const [icon, setIcon] = useState(initialIcon);

              const handlePress = async () => {
                if (user.savedQuestions === null) {
                  user.savedQuestions = [];
                }
              
                const questionIndex = user.savedQuestions.findIndex(q => q.id === params.element.question.id);
              
                if (questionIndex >= 0) {
                  // Question already exists, remove it
                  user.savedQuestions.splice(questionIndex, 1);
                  setIcon("bookmark-outline");
                } else {
                  // Question doesn't exist, add it
                  user.savedQuestions.push(params.element.question);
                  setIcon("bookmark");
                }
              
                try {
                  const result = await axios.put(`${API}Update/${user.id}`, JSON.stringify(user), {
                    headers: {
                      'Content-Type': 'application/json'
                    }
                  });
              
                  // Assuming result.data contains the updated user data
                  await AsyncStorage.setItem("@user", JSON.stringify(result.data));
                } catch (error) {
                  console.error('Error making PUT request:', error);
                }
              };

              return (
                <IconButton
                icon={icon}
                  iconColor={Theme.secondary}
                  size={30}
                  onPress={handlePress}
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
