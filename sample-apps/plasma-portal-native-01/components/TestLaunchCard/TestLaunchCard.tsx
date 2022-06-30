import { View, Text, StyleSheet } from "react-native";
import { Card } from "@rneui/themed";
import { fhirclient } from "fhirclient/lib/types";
import { Button as ThemeButton } from "./../core";

export interface ITestLaunchCardProps {
    onLaunch: (authParams: fhirclient.AuthorizeParams) => void;

    authParams_epicSandbox1: fhirclient.AuthorizeParams;
    authParams_epicSandbox2: any;
    authParams_smartOnFhir: any;
    authParams_ssmR4: any;
    authParams_cerner: any;
}

/** Just for convenience. Let's you quickly launch to several platforms */
export default function TestLaunchCard(props: ITestLaunchCardProps) {
    return (
        <Card>
            <View>
                <Text style={{ fontWeight: "bold", fontSize: 24 }}>Testing</Text>
                <View style={{ padding: 10 }} />

                <Text>Here are some test environments to try out:</Text>
                <View style={{ padding: 10 }} />
                
                <View style={styles.buttonRow}>
                    <ThemeButton title="Launch Epic Sandbox (1)" 
                        onPress={() => { props.onLaunch(props.authParams_epicSandbox1) }}
                    />
                    <Text style={styles.note}>fhircamila / epicepic1</Text>
                </View>

                <View style={styles.buttonRow}>
                    <ThemeButton title="Launch Epic Sandbox (2)"
                        onPress={() => { props.onLaunch(props.authParams_epicSandbox2) }}
                    />
                    <Text style={styles.note}>fhirjason / epicepic1</Text>
                </View>

                <View style={styles.buttonRow}>
                    <ThemeButton title="Launch SMART-on-FHIR Sandbox" 
                        onPress={() => { props.onLaunch(props.authParams_smartOnFhir) }}
                    />
                    <Text style={styles.note}>Gerardo Botello</Text>
                </View>

                <View style={styles.buttonRow}>
                    <ThemeButton title="Launch SSM Health (in Madison) [R4]"
                        onPress={() => { props.onLaunch(props.authParams_ssmR4) }}
                    />
                </View>
            </View>
        </Card>
    );
}

const styles = StyleSheet.create({
    buttonRow: { 
        flexDirection: "row", 
        alignItems: "center", 
        paddingBottom: 20
    },

    note: {
        paddingLeft: 5
    }
})