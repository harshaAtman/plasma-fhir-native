import { useContext, useCallback } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { fhirclient } from "fhirclient/lib/types";
//import type { NativeStackScreenProps } from '@react-navigation/native-stack';
//import { FHIRClientContext } from "plasma-fhir-react-client-context";
//import { RootStackParamList } from '../types';

import Client from "fhirclient/lib/Client";
import config from "./../constants/Config";

import { TestLaunchCard } from "../components";


const AUTH_PARAMS = config.EPIC_PATIENT_SANDBOX;
const mode = "LOCAL";

export default function TestScreen({ route, navigation }: any) {
    const onLaunchClick = useCallback(() => {
        navigation.navigate("LaunchScreen", { 
            authParams: AUTH_PARAMS, 
            onAuthenticated, onCancelOrError
        });
    }, []);

    const onAuthenticated = useCallback((client: Client | null) => {
        console.log("TestScreen::onAuthenticated Navigating to Allergies");

        navigation.navigate("Patient");
    }, []);

    const onCancelOrError = useCallback(() => {
        navigation.navigate("Test");
    }, []);

    const onLaunch = useCallback((authParams: fhirclient.AuthorizeParams) => {
        navigation.navigate("LaunchScreen", { 
            authParams, onAuthenticated, onCancelOrError 
        });
    }, []);

    return (
        <View style={styles.container}>
            <Text>Test Screen</Text>
            <Button onPress={onLaunchClick} title="Launch" />

             {/* DEBUG CARD */}
             {mode === "LOCAL" && <TestLaunchCard 
                onLaunch={onLaunch}
                authParams_epicSandbox1={config.EPIC_PATIENT_SANDBOX}
                authParams_epicSandbox2={config.EPIC_PATIENT_SANDBOX}
                authParams_smartOnFhir={config.SMART_PATIENT}
                authParams_ssmR4={config.EPIC_PATIENT_LIVE_R4}
                authParams_cerner={config.CERNER_PATIENT_R4}
            />}

        </View>
    );
}

const styles = StyleSheet.create({
    container: { padding: 10 }
});