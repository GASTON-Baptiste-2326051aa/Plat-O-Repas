import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Repas({ plat, quantiteSel, quantiteCalories, date }) {
    return (
        <View style={styles.repasContainer}>
            <Text style={styles.repasText}>Plats : {plat}</Text>
            <Text style={styles.repasText}>Quantité de sel : {quantiteSel}g</Text>
            <Text style={styles.repasText}>Calories : {quantiteCalories} kcal</Text>
            <Text style={styles.repasText}>Date : {date}</Text>
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
