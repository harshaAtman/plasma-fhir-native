import { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { IFHIRClientContext } from "plasma-fhir-react-client-context";
import Client from "./../fhirclient-js/Client";

export interface IUseDataLoadScreenProps<T> {
    context: IFHIRClientContext;
    getData: (fhirClient: Client) => Promise<T[]>;
}

export default function useDataLoadScreen<T>(props: IUseDataLoadScreenProps<T>) {
    const [data, setData] = useState<T[]>([]);
    const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);
    const [hasErrorLoading, setHasErrorLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    useEffect(() => {
        if (!isDataLoaded)
        {
            const fhirClient = props.context.client;
            if (!fhirClient)  { return; }
            
            props.getData(fhirClient as any).then((value: T[]) => {
                console.log(value);

                setIsDataLoaded(true);
                setData(value);
            }).catch((error) => {
                console.log(error, error.stack);
                setIsDataLoaded(true);
                setHasErrorLoading(true);
                setErrorMessage(error.toString());
            });
        }
    });

    // Optional component for a loading spinner...
    const elLoadingSpinner = (!isDataLoaded ? 
        <View style={{ position: "absolute", paddingTop: 20, left: "50%"}}>
            <Text>Loading...</Text>
        </View> : null);

    // Optional component for error message...
    const elErrorMessage = (hasErrorLoading ?
        <View style={{ padding: 5 }}>
            <View style={{ backgroundColor: "red", padding: 4, borderColor: "red" }}>
                <Text style={{ fontWeight: "bold" }}>Error Loading</Text>
                <Text>{errorMessage}</Text>
            </View>
        </View> : null);

    return {
        data, isDataLoaded, hasErrorLoading, errorMessage,
        elLoadingSpinner, elErrorMessage
    };
}