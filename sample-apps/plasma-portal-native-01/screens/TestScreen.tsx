import { useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { CommonActions } from '@react-navigation/native';
import { fhirclient } from "fhirclient/lib/types";
import Client from "fhirclient/lib/Client";
import { TestLaunchCard } from "../components";
import config from "./../constants/Config";
const mode = "LOCAL";

export default function TestScreen({ route, navigation }: any) {

    // Once the user has authenticated, navigate to the "Main" navigator (which holds the patient screens)....
    const onAuthenticated = useCallback((client: Client | null) => {
        navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [ { name: 'Main' } ],
            })
          );
    }, []);

    const onCancelOrError = useCallback(() => {
        navigation.navigate("Test");        // TODO: Update this
    }, []);

    // Occurs when one of the launch buttons is pressed...
    const onLaunch = useCallback((authParams: fhirclient.AuthorizeParams) => {
        navigation.navigate("LaunchScreen", { 
            authParams, onAuthenticated, onCancelOrError 
        });
    }, []);

    return (
        <View style={styles.container}>
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