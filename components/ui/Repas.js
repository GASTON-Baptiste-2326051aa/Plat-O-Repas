import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Repas() {
    return (
        <View style={styles.repasContainer}>
            <Text style={styles.repasText}>Bloc Repas</Text>
        </View>
    );
}
//a
const styles = StyleSheet.create({
    repasContainer: {
        backgroundColor: "#D3D3D3",
        borderRadius: 12,
        padding: 20,
        margin: 10,
        width: "40%",
        alignItems: "center",
    },
    repasText: {
        fontSize: 16,
        color: "#333",
    },
});
