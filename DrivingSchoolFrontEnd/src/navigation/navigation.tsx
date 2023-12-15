import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { useAuth } from "../auth/Auth";

//Screens

import QuizzView from "../views/QuizzView";
import QuizzSummaryView from "../views/QuizzSummaryView";
import HomeView from "../views/HomeView";
import LoginView from "../views/LoginView";
import QuizzSummaryDetailView from "../views/QuizzSummaryDetailView";

const Stack = createStackNavigator();
export function AuthStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeView">
        <Stack.Screen
          name="QuizzView"
          component={QuizzView}
          options={{ headerShown: false }}
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
          options={{ headerShown: true }}
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
