import { View, Text } from "react-native";

import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { ColorSchemeName } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Screens from "./../screens";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const isAuthenticated = false;

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
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Test" component={Screens.TestScreen} />
      <Stack.Screen name="LaunchScreen" component={Screens.LaunchScreen} />
      <Stack.Screen name="Main" component={MainNavigator} />
    </Stack.Navigator>
  );
}

// https://stackoverflow.com/questions/67130651/reanimated-2-failed-to-create-a-worklet-maybe-you-forgot-to-add-reanimateds-ba
function MainNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Patient">
      <Drawer.Screen name="Patient" component={Screens.PatientScreen} />
      <Drawer.Screen name="Encounters" component={Screens.EncountersScreen} />
      <Drawer.Screen name="Allergies" component={Screens.AllergiesScreen} />
      <Drawer.Screen name="Conditions" component={Screens.ConditionsScreen} />
      <Drawer.Screen name="FamilyHistory" component={Screens.FamilyHistoryScreen} />
      <Drawer.Screen name="Immunizations" component={Screens.ImmunizationsScreen} />
      {/*
      <Drawer.Screen name="Labs" component={Screens.LabsScreen} />
      <Drawer.Screen name="Vitals" component={Screens.VitalsScreen} />
      */}
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