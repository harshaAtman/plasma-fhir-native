import { useContext, useCallback } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
//import type { NativeStackScreenProps } from '@react-navigation/native-stack';
//import { FHIRClientContext } from "plasma-fhir-react-client-context";
//import { RootStackParamList } from '../types';

import Client from "./../fhirclient-js/Client";
import config from "./../constants/Config";

const AUTH_PARAMS = config.EPIC_PATIENT_SANDBOX;

export default function TestScreen({ route, navigation }: any) {
    const onLaunchClick = useCallback(() => {
        navigation.navigate("LaunchScreen", { authParams: AUTH_PARAMS, onAuthenticated });
    }, []);

    const onAuthenticated = useCallback((client: Client | null) => {
        console.log("TestScreen::onAuthenticated Navigating to Allergies");
        navigation.navigate("Allergies");
    }, []);

    return (
        <View style={styles.container}>
            <Text>Test Screen</Text>
            <Button onPress={onLaunchClick} title="Launch" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { padding: 50 }
});