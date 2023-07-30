import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";

import RegistrationScreen from "./RegistrationScreen";
import LoginScreen from "./LoginScreen";
import Home from "./Home";
import { selectToken } from "../redux/auth/authSelectors";

const MainStack = createStackNavigator();

export default function MainScreen() {
  const isSignedIn = useSelector(selectToken);

  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <MainStack.Navigator initialRouteName="Login">
        {!isSignedIn ? (
          <>
            <MainStack.Screen
              name="Registration"
              component={RegistrationScreen}
              options={{ headerShown: false }}
            />
            <MainStack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <MainStack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
        )}
      </MainStack.Navigator>

      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
