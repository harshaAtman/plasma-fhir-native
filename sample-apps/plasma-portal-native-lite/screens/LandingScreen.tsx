import { useState, useCallback } from "react";
import { ScrollView, View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { CommonActions } from '@react-navigation/native';
import { fhirclient } from "fhirclient/lib/types";
import Client from "fhirclient/lib/Client";
import config from "../constants/Config";

export default function LandingScreen({ route, navigation }: any) {
    // Once the user has authenticated, navigate to the "Main" navigator (which holds the patient screens)....
    const onAuthenticated = useCallback((client: Client | null) => {
        navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [ { name: 'Main' } ],
            })
          );
    }, []);

    // Go back to LandingScreen if user cancels...
    const onCancelOrError = useCallback(() => {
        navigation.navigate("LandingScreen");
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
                <Text style={styles.header}>Plasma Portal Native (Lite)</Text>
            </View>

            {/* SMART-HEALTH-IT PATIENT STANDALONE */}
            <View style={styles.rowContainer}>
                <View style={{ flexDirection: "row", paddingVertical: 5 }}>
                    <Text style={{ fontWeight: "bold", color: "white" }}>
                        SMART Health IT (Sandbox)
                    </Text>
                </View>

                <View style={{ flexDirection: "row", paddingVertical: 5 }}>
                    <Text style={{ color: "rgb(156, 163, 175)" }}>🤒 Patient</Text>
                    <Text style={{ color: "rgb(156, 163, 175)", paddingHorizontal: 5 }}>/</Text>
                    <Text style={{ color: "rgb(156, 163, 175)" }}>Standalone</Text>
                    <Text style={{ color: "rgb(156, 163, 175)", paddingHorizontal: 5 }}>/</Text>
                    <Text style={{ color: "rgb(156, 163, 175)" }}>R4</Text>
                </View>

                <View style={{ flexDirection: "column", paddingVertical: 10 }}>
                    <Text style={{ color: "rgb(156, 163, 175)", fontSize: 10 }}>Hard-coded patient:</Text>
                    <Text style={{ color: "rgb(156, 163, 175)", fontSize: 10, fontStyle: "italic" }}>Gerardo Botello</Text>
                </View>

                <TouchableOpacity onPress={() => { onLaunch(config.SMART_PATIENT) }} style={[styles.buttonContainer, { backgroundColor: "#2563EB" }]}>
                    <Text style={styles.buttonText}>Launch</Text>
                </TouchableOpacity>
            </View>

            {/* SMART-HEALTH-IT CLINICIAN STANDALONE */}
            <View style={styles.rowContainer}>
                <View style={{ flexDirection: "row", paddingVertical: 5 }}>
                    <Text style={{ fontWeight: "bold", color: "white" }}>
                        SMART Health IT (Sandbox)
                    </Text>
                </View>

                <View style={{ flexDirection: "row", paddingVertical: 5 }}>
                    <Text style={{ color: "rgb(156, 163, 175)" }}>👨‍⚕️ Clinician</Text>
                    <Text style={{ color: "rgb(156, 163, 175)", paddingHorizontal: 5 }}>/</Text>
                    <Text style={{ color: "rgb(156, 163, 175)" }}>Standalone</Text>
                    <Text style={{ color: "rgb(156, 163, 175)", paddingHorizontal: 5 }}>/</Text>
                    <Text style={{ color: "rgb(156, 163, 175)" }}>R4</Text>
                </View>

                <View style={{ flexDirection: "column", paddingVertical: 10 }}>
                    <Text style={{ color: "rgb(156, 163, 175)", fontSize: 10 }}>Hard-coded patient:</Text>
                    <Text style={{ color: "rgb(156, 163, 175)", fontSize: 10, fontStyle: "italic" }}>Gerardo Botello</Text>
                </View>

                <TouchableOpacity onPress={() => { onLaunch(config.SMART_PATIENT) }} style={[styles.buttonContainer, { backgroundColor: "#2563EB" }]}>
                    <Text style={styles.buttonText}>Launch</Text>
                </TouchableOpacity>
            </View>

            {/* EPIC (SANDBOX) PATIENT STANDALONE */}
            <View style={styles.rowContainer}>
                <View style={{ flexDirection: "row", paddingVertical: 5 }}>
                    <Text style={{ fontWeight: "bold", color: "white" }}>
                        Epic (Sandbox)
                    </Text>
                </View>

                <View style={{ flexDirection: "row", paddingVertical: 5 }}>
                    <Text style={{ color: "rgb(156, 163, 175)" }}>🤒 Patient</Text>
                    <Text style={{ color: "rgb(156, 163, 175)", paddingHorizontal: 5 }}>/</Text>
                    <Text style={{ color: "rgb(156, 163, 175)" }}>Standalone</Text>
                    <Text style={{ color: "rgb(156, 163, 175)", paddingHorizontal: 5 }}>/</Text>
                    <Text style={{ color: "rgb(156, 163, 175)" }}>R4</Text>
                </View>

                <View style={{ flexDirection: "column", paddingVertical: 10 }}>
                    <Text style={{ color: "rgb(156, 163, 175)", fontSize: 12, fontWeight: "bold" }}>Instructions:</Text>
                    <Text style={{ color: "rgb(156, 163, 175)", fontSize: 10 }}>- Open app.json and set the "slug" value to the name of your app</Text>
                    <Text style={{ color: "rgb(156, 163, 175)", fontSize: 10 }}>- Set a redirect URL of https://auth.expo.io/[expo-user-name]/[slug-name]</Text>
                    <Text style={{ color: "rgb(156, 163, 175)", fontSize: 10 }}>- Edit EPIC_PATIENT_SANDBOX in config.ts and use your "Non-Production Client ID" for a Patient App</Text>

                    <View style={{ paddingTop: 10 }} />
                    <Text style={{ color: "rgb(156, 163, 175)", fontSize: 12, fontWeight: "bold" }}>Logins (partial list):</Text>
                    <Text style={{ color: "rgb(156, 163, 175)", fontSize: 10 }}>- fhircamila / epicepic1</Text>
                    <Text style={{ color: "rgb(156, 163, 175)", fontSize: 10 }}>- fhirjason / epicepic1</Text>
                    <Text style={{ color: "rgb(156, 163, 175)", fontSize: 10 }}>- fhirderrick / epicepic1</Text>
                </View>

                <TouchableOpacity onPress={() => { onLaunch(config.EPIC_PATIENT_SANDBOX) }} style={[styles.buttonContainer, { backgroundColor: "rgb(220, 38, 38)" }]}>
                    <Text style={styles.buttonText}>Launch</Text>
                </TouchableOpacity>
            </View>

            {/* EPIC (SANDBOX) CLINICIAN STANDALONE */}
            <View style={styles.rowContainer}>
                <View style={{ flexDirection: "row", paddingVertical: 5 }}>
                    <Text style={{ fontWeight: "bold", color: "white" }}>
                        Epic (Sandbox)
                    </Text>
                </View>

                <View style={{ flexDirection: "row", paddingVertical: 5 }}>
                    <Text style={{ color: "rgb(156, 163, 175)" }}>👨‍⚕️ Clinician</Text>
                    <Text style={{ color: "rgb(156, 163, 175)", paddingHorizontal: 5 }}>/</Text>
                    <Text style={{ color: "rgb(156, 163, 175)" }}>Standalone</Text>
                    <Text style={{ color: "rgb(156, 163, 175)", paddingHorizontal: 5 }}>/</Text>
                    <Text style={{ color: "rgb(156, 163, 175)" }}>R4</Text>
                </View>

                <View style={{ flexDirection: "column", paddingVertical: 10 }}>
                    <Text style={{ color: "rgb(156, 163, 175)", fontSize: 12, fontWeight: "bold" }}>Instructions:</Text>
                    <Text style={{ color: "rgb(156, 163, 175)", fontSize: 10 }}>- Open app.json and set the "slug" value to the name of your app</Text>
                    <Text style={{ color: "rgb(156, 163, 175)", fontSize: 10 }}>- Set a redirect URL of https://auth.expo.io/[expo-user-name]/[slug-name]</Text>
                    <Text style={{ color: "rgb(156, 163, 175)", fontSize: 10 }}>- Edit EPIC_CLINICIAN_SANDBOX in config.ts and use your "Non-Production Client ID" for a Clinician App</Text>

                    <View style={{ paddingTop: 10 }} />
                    <Text style={{ color: "rgb(156, 163, 175)", fontSize: 12, fontWeight: "bold" }}>Login:</Text>
                    <Text style={{ color: "rgb(156, 163, 175)", fontSize: 10 }}>- FHIR / EpicFhir11!</Text>
                </View>

                <TouchableOpacity onPress={() => { onLaunch(config.EPIC_CLINICIAN_SANDBOX) }} style={[styles.buttonContainer, { backgroundColor: "rgb(220, 38, 38)" }]}>
                    <Text style={styles.buttonText}>Launch</Text>
                </TouchableOpacity>
            </View>

            {/* EPIC (LIVE) PATIENT STANDALONE */}
            <View style={styles.rowContainer}>
                <View style={{ flexDirection: "row", paddingVertical: 5 }}>
                    <Text style={{ fontWeight: "bold", color: "white" }}>
                        Epic (Live Client)
                    </Text>
                </View>

                <View style={{ flexDirection: "row", paddingVertical: 5 }}>
                    <Text style={{ color: "rgb(156, 163, 175)" }}>🤒 Patient</Text>
                    <Text style={{ color: "rgb(156, 163, 175)", paddingHorizontal: 5 }}>/</Text>
                    <Text style={{ color: "rgb(156, 163, 175)" }}>Standalone</Text>
                    <Text style={{ color: "rgb(156, 163, 175)", paddingHorizontal: 5 }}>/</Text>
                    <Text style={{ color: "rgb(156, 163, 175)" }}>R4</Text>
                </View>

                <View style={{ flexDirection: "column", paddingVertical: 10 }}>
                    <Text style={{ color: "rgb(156, 163, 175)", fontSize: 12, fontWeight: "bold" }}>Instructions:</Text>
                    <Text style={{ color: "rgb(156, 163, 175)", fontSize: 10 }}>- Open app.json and set the "slug" value to the name of your app</Text>
                    <Text style={{ color: "rgb(156, 163, 175)", fontSize: 10 }}>- Set a redirect URL of https://auth.expo.io/[expo-user-name]/[slug-name]</Text>
                    <Text style={{ color: "rgb(156, 163, 175)", fontSize: 10 }}>- Edit EPIC_PATIENT_LIVE_R4 in config.ts and set use your "Client ID" for a Patient App</Text>
                    <Text style={{ color: "rgb(156, 163, 175)", fontSize: 10 }}>- Edit EPIC_PATIENT_LIVE_R4 in config.ts and set "iss" to the endpoint you want to connect to</Text>
                </View>

                <TouchableOpacity onPress={() => { onLaunch(config.EPIC_PATIENT_LIVE_R4) }} style={[styles.buttonContainer, { backgroundColor: "rgb(220, 38, 38)" }]}>
                    <Text style={styles.buttonText}>Launch</Text>
                </TouchableOpacity>
            </View>

            <View style={{ paddingTop: 100 }} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { padding: 10, paddingTop: 75, backgroundColor: "white" },
    logo: { width: 60, height: 60, borderRadius: 10 },
    header: { fontWeight: "bold", fontSize: 24, paddingTop: 10 },
    buttonText: { fontWeight: "bold", color: "white", alignSelf: "center" },
    buttonContainer: { padding: 10, width: 100, borderRadius: 10 },

    rowContainer: {
        flex: 1, 
        padding: 10,
        margin: 10,
        alignSelf: 'stretch', 
        borderWidth: 1, 
        borderRadius: 5,
        backgroundColor: "rgb(31, 41, 55)"
    }
});