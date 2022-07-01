import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import IEndpoint from "./IEndpoint";

export interface IEndPointListItemProps { 
    endpoint: IEndpoint; 
    authParams: any; 
    onPress: (authParams: any) => void;
}

export default function EndPointListItem(props: IEndPointListItemProps) {
    return (
        <TouchableOpacity style={{ paddingVertical: 5 }} onPress={() => props.onPress(props.authParams)}>
            <Text>{props.endpoint.name}</Text>
            <Text style={{ fontSize: 8 }}>{props.endpoint.address}</Text>
        </TouchableOpacity>
    )
}