import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {REPAS_DATA} from "./IngredientPlatsRepasScreen";

const calculTotal = (key) => {
    return REPAS_DATA.reduce((total, repas) => {
        const value = parseFloat(repas[key]);
        return total + (isNaN(value) ? 0 : value);
    }, 0);
};

const Gauge = ({ value, max, unit }) => {
    const percentage = (value / max) * 100;
    const gaugeColor = percentage > 80 ? "#ff4d4d" : "#00FF00"; // Rouge si plus de 80% du max, sinon gris


    return (
        <View style={styles.gaugeContainer}>
            <View style={[styles.gaugeFill, { width: `${percentage}%`, backgroundColor: gaugeColor}]} />
            <Text style={styles.gaugeText}>{value}{unit}</Text>
        </View>
    );
};

const GaugeScreen = () => {
    const totalSel = calculTotal("sel");
    const totalCalories = calculTotal("calories");

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Taux de sel</Text>
            <Gauge value={totalSel} max={5} unit="g" />
            <Text style={styles.recoText}>
                Il est recommandé de prendre moins de 5g par jour.
            </Text>

            <Text style={styles.title}>Taux de calorie</Text>
            <Gauge value={totalCalories} max={2000} unit="kcal" />
            <Text style={styles.recoText}>
                Il est recommandé de prendre plus de 2000kcal par jour.
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ddd",
        padding: 20,
        justifyContent: "center",
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 20,
    },
    gaugeContainer: {
        width: "100%",
        height: 20,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#000",
        borderRadius: 5,
        overflow: "hidden",
        marginVertical: 10,
    },
    gaugeFill: {
        height: "100%",
        backgroundColor: "#a3a3a3",
    },
    gaugeText: {
        position: "absolute",
        right: 5,
        top: -5,
        fontSize: 16,
        fontWeight: "bold",
    },
    recoText: {
        textAlign: "center",
        marginBottom: 20,
    },
});

export default GaugeScreen;
