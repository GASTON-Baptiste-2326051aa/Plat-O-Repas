import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Gauge from "../../components/ui/Gauge";

export default function Index() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Hello, React Native!</Text>
            <Gauge></Gauge>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#333",
    },
});
