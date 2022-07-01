import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from "react-native";
import { IFHIRClientContext } from "plasma-fhir-react-client-context";
import Client from 'fhirclient/lib/Client';

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
            
            props.getData(fhirClient).then((value: T[]) => {
                setIsDataLoaded(true);
                setData(value);
            }).catch((error) => {
                setIsDataLoaded(true);
                setHasErrorLoading(true);
                setErrorMessage(error.toString());
            });
        }
    });

    // Optional component for a loading spinner...
    const elLoadingSpinner = (!isDataLoaded ? <ActivityIndicator /> : null);

    // Optional component for error message...
    const elErrorMessage = (hasErrorLoading ?
        <View style={{ padding: 5 }}>
            <View style={{ padding: 4, backgroundColor: "red", borderWidth: 1, borderColor: "red" }}>
                <Text style={{ fontWeight: "bold" }}>Error Loading</Text>
                <Text>{errorMessage}</Text>
            </View>
        </View> : null);

    return {
        data, isDataLoaded, hasErrorLoading, errorMessage,
        elLoadingSpinner, elErrorMessage
    };
}