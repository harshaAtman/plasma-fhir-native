import React from "react";
import { View, Text, Image, Linking, StyleSheet } from "react-native";

function AppFooter() {
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image source={require("../../assets/img/logo.jpg")} style={styles.logo} />
                <Text style={{ paddingLeft: 5 }}>Powered By </Text>
                <Text style={{color: 'blue'}} onPress={() => Linking.openURL('https://plasmafhir.com')}>
                    Plasma
                </Text>
            </View>

            <View>
                <Text>© 2022</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 60, 
        paddingHorizontal: 20, 
        flexDirection: "row", 
        alignItems: "center", 
        justifyContent: "space-between"
    },

    logo: { 
        width: 30,
        height: 30,
        borderRadius: 10,
    }
})

export default AppFooter;