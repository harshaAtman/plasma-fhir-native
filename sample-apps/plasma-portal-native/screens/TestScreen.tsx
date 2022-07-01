import { useState, useCallback } from "react";
import { ScrollView, View, Text, Image, StyleSheet } from "react-native";
import { CommonActions } from '@react-navigation/native';
import { fhirclient } from "fhirclient/lib/types";
import Client from "fhirclient/lib/Client";
import { TestLaunchCard, FHIRVersionSelector, HealthSystemSearch } from "../components";
import config from "./../constants/Config";

// Epic endpoints...
const endpointsDSTU2 = require("../assets/endpoints/Epic_DSTU2Endpoints.json");
const endpointsR4 = require("../assets/endpoints/Epic_R4Endpoints.json");

const mode = "LOCAL";
const appVersion = "20220701.001";


export default function TestScreen({ route, navigation }: any) {
    const [version, setVersion] = useState<"r4" | "dstu2">("r4");
    const endpoints = (version === "dstu2") ? endpointsDSTU2 : endpointsR4;

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
        <ScrollView style={styles.container}>
            <View style={{ alignItems: "center" }}>
                <Image source={require("../assets/img/logo.jpg")} style={styles.logo} />
                <Text style={styles.header}>Welcome to the Plasma Portal</Text>
                <Text>Version {appVersion}</Text>
            </View>

             {/* DEBUG CARD */}
             {mode === "LOCAL" && <TestLaunchCard 
                onLaunch={onLaunch}
                authParams_epicSandbox1={config.EPIC_PATIENT_SANDBOX}
                authParams_epicSandbox2={config.EPIC_PATIENT_SANDBOX}
                authParams_smartOnFhir={config.SMART_PATIENT}
                authParams_ssmR4={config.EPIC_PATIENT_LIVE_R4}
                authParams_cerner={config.CERNER_PATIENT_R4}
            />}

            {/* FHIR VERSION SELECTOR */}
            <View style={{ paddingTop: 10 }} />
            <View style={{ alignItems: "center" }}>
                <Text style={{ fontWeight: "bold", paddingBottom: 5 }}>FHIR Version:</Text>
                <FHIRVersionSelector version={version} onVersionChange={setVersion} />
            </View>
            <View style={{ paddingTop: 20 }} />

            {/* HEALTH SYSTEM SEARCH */}
            <View style={{ paddingTop: 5 }} />
            <Text>Search for your health system below to launch the portal...</Text>          
            <View style={{ paddingTop: 5 }} />
            <HealthSystemSearch 
                onPress={onLaunch}
                authParams={(version === "dstu2") ? config.EPIC_PATIENT_LIVE_DSTU2 : config.EPIC_PATIENT_LIVE_R4 } 
                endpoints={endpoints.entry.map((endpoint: any) => { 
                        return { name: endpoint.resource.name, address: endpoint.resource.address }
                    })
                } 
            />

            <View style={{ paddingTop: 150 }} />

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { padding: 10, paddingTop: 75, backgroundColor: "white" },
    logo: { width: 60, height: 60, borderRadius: 10 },
    header: { fontWeight: "bold", fontSize: 24 },
});