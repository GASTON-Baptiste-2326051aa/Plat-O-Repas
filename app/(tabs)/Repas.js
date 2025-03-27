import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Repas() {
    return (
        <View style={styles.repasContainer}>
            <Text style={styles.repasText}>Bloc Repas</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    repasContainer: {
        backgroundColor: "#D3D3D3", // Gris clair
        borderRadius: 12, // Bords arrondis
        padding: 20,
        margin: 10,
        width: "40%", // Largeur de 90% de l'écran
        alignItems: "center", // Centrer le texte dans le bloc
    },
    repasText: {
        fontSize: 16,
        color: "#333", // Couleur du texte
    },
});
