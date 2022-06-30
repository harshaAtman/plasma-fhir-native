import { View, Text } from "react-native";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { fhirclient } from "fhirclient/lib/types";
//import { RootStackParamList } from '../types';
import { FHIRClientLauncher } from "../components/plasma-fhir-react-client-context/FHIRClientLauncher";

import config from "../constants/Config";
const DEFAULT_AUTH_PARAMS = config.EPIC_PATIENT_SANDBOX;

export default function LaunchScreen({ route, navigation }: NativeStackScreenProps<any, 'LaunchScreen'>) {
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
        <FHIRClientLauncher 
            authParams={authParams}
            defaultElement={defaultElement}
            onAuthenticated={route.params.onAuthenticated}
        />
    );
}