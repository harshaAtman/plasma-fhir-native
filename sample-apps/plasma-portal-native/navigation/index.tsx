import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { ColorSchemeName } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Screens from "./../screens";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
    return (
      <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <AuthNavigator />
      </NavigationContainer>
    );
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
      <Drawer.Screen name="Immunizations" component={Screens.ImmunizationsScreen} />
      <Drawer.Screen name="Labs" component={Screens.LabsScreen} />
    </Drawer.Navigator>
  );
}