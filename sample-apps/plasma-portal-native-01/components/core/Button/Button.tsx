import React from "react";
import { StyleSheet } from "react-native";
import { Button as ThemeButton } from "@rneui/themed";

export default function Button(props: any) {
    return (
        <ThemeButton containerStyle={styles.containerStyle} buttonStyle={styles.buttonStyle} titleStyle={styles.titleStyle} {...props}>
            {props.children}
        </ThemeButton>
    );
}

const styles = StyleSheet.create({
    containerStyle: {
        width: "50%"
    },

    buttonStyle: { 
        backgroundColor: 'rgba(29, 78, 216, 1)', 
        borderRadius: 5, 
    },

    titleStyle: {
        fontWeight: "bold",
        fontSize: 12
    }
})