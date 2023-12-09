import { View, Text, Image, StyleSheet, Dimensions, Button, TouchableOpacity } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

//Screens

import Quizz from '../views/Quizz';
import Home from '../views/Home';
import Login from '../views/Login';

const Stack = createStackNavigator();
export function AuthStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Quizz"
          component={Quizz}
          options={{ headerShown: false  }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false  }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export function GuestStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false  }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}