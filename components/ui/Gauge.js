import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { INGREDIENTS_DATA, PLATS_DATA, REPAS_DATA } from "../../constants/data";

// Fonction pour calculer les valeurs nutritionnelles d'un plat
const calculatePlatNutrition = (platIngredients) => {
    if (!platIngredients || platIngredients.length === 0) return { sel: 0, calories: 0 };

    return platIngredients.reduce((total, ingredientName) => {
        const ingredient = INGREDIENTS_DATA.find(ing => ing.name === ingredientName);
        if (!ingredient) return total;

        return {
            sel: total.sel + (parseFloat(ingredient.sel) || 0),
            calories: total.calories + (parseFloat(ingredient.calories) || 0)
        };
    }, { sel: 0, calories: 0 });
};

// Fonction pour calculer les valeurs nutritionnelles d'un repas
const calculateRepasNutrition = (repasPlats) => {
    if (!repasPlats || repasPlats.length === 0) return { sel: 0, calories: 0 };

    return repasPlats.reduce((total, platName) => {
        const plat = PLATS_DATA.find(p => p.name === platName);
        if (!plat) return total;

        const platNutrition = calculatePlatNutrition(plat.ingredients);

        return {
            sel: total.sel + platNutrition.sel,
            calories: total.calories + platNutrition.calories
        };
    }, { sel: 0, calories: 0 });
};

const calculTotal = (key) => {
    return REPAS_DATA.reduce((total, repas) => {
        const nutrition = calculateRepasNutrition(repas.plats);
        const value = key === "sel" ? nutrition.sel : nutrition.calories;
        return total + (isNaN(value) ? 0 : value);
    }, 0);
};

const Gauge = ({ value, max, unit }) => {
    const percentage = (value / max) * 100;
    const gaugeColor = percentage > 80 ? "#ff4d4d" : "#00FF00"; // Rouge si plus de 80% du max, sinon vert

    return (
        <View style={styles.gaugeContainer}>
            <View style={[styles.gaugeFill, { width: `${percentage}%`, backgroundColor: gaugeColor}]} />
            <Text style={styles.gaugeText}>{value.toFixed(1)}{unit}</Text>
        </View>
    );
};

const GaugeScreen = () => {
    const totalSel = calculTotal("sel");
    const totalCalories = calculTotal("calories");

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Taux de sel</Text>
            <Gauge value={totalSel} max={20} unit="g" />
            <Text style={styles.recoText}>
                Il est recommandé de prendre moins de 20g par jour.
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