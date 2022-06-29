import { useContext } from "react";
import { View, Text } from "react-native";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FHIRClientContext } from "plasma-fhir-react-client-context";
import { RootStackParamList } from '../types';

export default function TestScreen({ route, navigation }: NativeStackScreenProps<RootStackParamList, 'TestScreen'>) {
    //const context = useContext(FHIRClientContext);  
    //console.log(context);

    //const { fhirClient } = route.params;
    const fhirClient = { patient: { id: "1" } };


    return (
        <View>
            <Text>Test Screen</Text>
            <Text>{fhirClient?.patient.id}</Text>
        </View>
    );
}