import { View, Text } from "react-native";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { fhirclient } from "fhirclient/lib/types";
//import { RootStackParamList } from '../types';
import { ParamListBase } from "@react-navigation/native";
import { FHIRClientLauncher } from "../components/plasma-fhir-react-native-client-context/FHIRClientLauncher";
import { FHIRClientContext } from "../components/plasma-fhir-react-native-client-context";

// TODO: Use RootStackParamList thing
// TODO: I don't want to put the consumer there. How do I avoid it?

import config from "../constants/Config";
const DEFAULT_AUTH_PARAMS = config.EPIC_PATIENT_SANDBOX;

export default function LaunchScreen({ route, navigation }: NativeStackScreenProps<any, 'LaunchScreen'>) {
    if (!route.params) { return null; }

    // TODO: Need to figure out how to get "launch"

    // If authParams were passed from the previous page, use those. Otherwise, use the ones we loaded...
    let authParams: fhirclient.AuthorizeParams = Object.assign({}, DEFAULT_AUTH_PARAMS);
    if (route.params.authParams) { authParams = route.params.authParams; }
    //if (launch) { authParams.launch = launch; }       // TODO:

    // Element to show while authorization is getting ready...
    const defaultElement = (
        <View>
            <Text>Loading...</Text>
        </View>
    );

    return (
        <FHIRClientContext.Consumer>
            {(context) => {
                return <FHIRClientLauncher 
                    authParams={authParams}
                    state="1234"
                    defaultElement={defaultElement}
                    onAuthenticated={(client: any) => {
                        context.setClient(client);
                        if (route.params) {
                            route.params.onAuthenticated(client);   
                        }
                    }}
                    onCancelOrError={route.params?.onCancelOrError}
                />
            }}
        </FHIRClientContext.Consumer>
    );
}