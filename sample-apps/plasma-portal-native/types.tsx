/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Client from "./fhirclient-js/Client";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
  LaunchScreen: { authParams?: any, onAuthenticated: (client: any, code: string, clientId: string, state: string, accessToken: string) => void };
  TestScreen: { fhirClient: Client | null };
  
  AllergiesScreen: { };
  ConditionsScreen: { };
  EncountersScreen: { };
  FamilyHistoryScreen: { };
  ImmunizationsScreen: { };
  LabsScreen: { };
  PatientScreen: { };
  VitalsScreen: { };
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;
