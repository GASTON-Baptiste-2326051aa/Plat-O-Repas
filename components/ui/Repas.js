import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Repas({plat, quantiteSel, quantiteCalories, date}) {
    return (
        <View style={styles.repasContainer}>
            <Text style={styles.repasText}>Bloc Repas</Text>
            <Text style={styles.repasText}>Plats : {plat}</Text>
            <Text style={styles.repasText}>Quantité de sel : {quantiteSel}g</Text>
            <Text style={styles.repasText}>Calories : {quantiteCalories} kcal</Text>
            <Text style={styles.repasText}>Date : {date}</Text>
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
        marginBottom: 5, // Espacement entre les lignes
    },
});
