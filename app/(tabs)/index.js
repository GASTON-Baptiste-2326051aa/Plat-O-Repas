import React from "react";
import { View, Text, StyleSheet } from "react-native";
import JaugeScreen from "../../components/ui/JaugeScreen";
import Repas from "./Repas";

export default function Index() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Hello, React Native!</Text>
            <JaugeScreen></JaugeScreen>
            <Repas></Repas>
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
