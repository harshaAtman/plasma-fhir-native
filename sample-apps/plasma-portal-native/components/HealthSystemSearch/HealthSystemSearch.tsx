import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
import IEndpoint from "./IEndpoint";
import EndPointList from "./EndPointList";

interface IHealthSystemSearchProps { 
    endpoints: IEndpoint[]; 
    authParams: any; 
    onPress: (authParams: any) => void;
}

/** Searchable EndPoint list */
export default function HealthSystemSearch(props: IHealthSystemSearchProps) {
    const [searchQuery, setSearchQuery] = useState<string>("");

    // Returns true if endpoint matches search query...
    const doesEndpointMatchSearchQuery = function(searchQuery: string, endPoint: IEndpoint): boolean {
        const name = endPoint.name.toLowerCase();
        return name.indexOf(searchQuery.toLowerCase()) > -1;
    }

    return (
        <>
            {/* Search Bar */}
            <View style={{ padding: 5 }}>
                <View style={{ borderWidth: 1, borderColor: "black", borderStyle: "solid", borderRadius: 5 }}>
                    <TextInput placeholder="Search..." 
                        value={searchQuery}
                        onChangeText={(e: string) => setSearchQuery(e)} 
                        autoCorrect={false}
                        autoCapitalize="none"
                        style={{ padding: 5, fontSize: 16 }}
                    />
                </View>
            </View>

            {/* ENDPOINTS */}
            <View>
                <EndPointList 
                    onPress={props.onPress}
                    authParams={props.authParams} 
                    endpoints={props.endpoints.filter((endPoint: IEndpoint) => doesEndpointMatchSearchQuery(searchQuery || "", endPoint))} 
                />
            </View>
        </>
    );
}