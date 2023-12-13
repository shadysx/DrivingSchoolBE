import { View, Text, Image, StyleSheet, Dimensions, Button, TouchableOpacity } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../auth/Auth'

//Screens

import QuizzView from '../views/QuizzView';
import Home from '../views/Home';
import Login from '../views/Login';
import QuizzSummaryView from '../views/QuizzSummaryView';


const Stack = createStackNavigator();
export function AuthStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeView">
        <Stack.Screen
          name="QuizzView"
          component={QuizzView}
          options={{ headerShown: false  }}
          />
        <Stack.Screen
          name="HomeView"
          component={Home}
          options={{ headerShown: false  }}
          />
                  <Stack.Screen
          name="QuizzSummaryView"
          component={QuizzSummaryView}
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

const Navigation = () => {
  const { user } = useAuth();
  return user ? <AuthStack/> : <GuestStack/>
}

export default Navigation;
