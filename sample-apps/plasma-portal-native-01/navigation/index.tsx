import { View, Text } from "react-native";

import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { ColorSchemeName } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Screens from "./../screens";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const isAuthenticated = true;

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
    return (
      <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        {isAuthenticated ? <MainNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    );
}





function LoginScreen() {
  return (
    <View>
      <Text>Login</Text>
    </View>
  )
}

function RegisterScreen() {
  return (
    <View>
      <Text>Register</Text>
    </View>
  )
}

function AuthNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

// https://stackoverflow.com/questions/67130651/reanimated-2-failed-to-create-a-worklet-maybe-you-forgot-to-add-reanimateds-ba
function MainNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Test">
      <Stack.Screen name="LaunchScreen" component={Screens.LaunchScreen} />
      <Drawer.Screen name="Test" component={Screens.TestScreen} />
      <Drawer.Screen name="Allergies" component={Screens.AllergiesScreen} />
      <Drawer.Screen name="Conditions" component={Screens.ConditionsScreen} />
      <Drawer.Screen name="Encounters" component={Screens.EncountersScreen} />
    </Drawer.Navigator>
  );
}


/*


function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
      <Stack.Screen name="TestScreen" component={TestScreen} />
      <Stack.Screen name="AllergiesScreen" component={AllergiesScreen} />
      <Stack.Screen name="LaunchScreen" component={LaunchScreen} />
    </Stack.Navigator>
  );
}
*/