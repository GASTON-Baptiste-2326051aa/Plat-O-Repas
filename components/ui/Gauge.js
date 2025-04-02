import React, { useContext } from "react";
import { View, Text } from "react-native";
import styles from '../../assets/styles/GaugeStyle';
import { DataContext } from '../../app/(tabs)/index'; // Import the context

const calculatePlatNutrition = (platIngredients, ingredientsData) => {
    if (!platIngredients || platIngredients.length === 0) return { sel: 0, calories: 0 };

    return platIngredients.reduce((total, ingredientName) => {
        const ingredient = ingredientsData.find(ing => ing.name === ingredientName);
        if (!ingredient) return total;

        return {
            sel: total.sel + (parseFloat(ingredient.sel) || 0),
            calories: total.calories + (parseFloat(ingredient.calories) || 0)
        };
    }, { sel: 0, calories: 0 });
};

const calculateRepasNutrition = (repasPlats, platsData, ingredientsData) => {
    if (!repasPlats || repasPlats.length === 0) return { sel: 0, calories: 0 };

    return repasPlats.reduce((total, platName) => {
        const plat = platsData.find(p => p.name === platName);
        if (!plat) return total;

        const platNutrition = calculatePlatNutrition(plat.ingredients, ingredientsData);

        return {
            sel: total.sel + platNutrition.sel,
            calories: total.calories + platNutrition.calories
        };
    }, { sel: 0, calories: 0 });
};

const Gauge = ({ value, max, unit }) => {
    const percentage = (value / max) * 100;
    const gaugeColor = percentage > 80 ? "#ff4d4d" : "#00FF00";

    return (
        <View style={styles.gaugeContainer}>
            <View style={[styles.gaugeFill, { width: `${percentage}%`, backgroundColor: gaugeColor}]} />
            <Text style={styles.gaugeText}>{value.toFixed(1)}{unit}</Text>
        </View>
    );
};

const GaugeScreen = () => {
    const { repasData, platsData, ingredientsData } = useContext(DataContext);

    const calculTotal = (key) => {
        return repasData.reduce((total, repas) => {
            const nutrition = calculateRepasNutrition(repas.plats, platsData, ingredientsData);
            const value = key === "sel" ? nutrition.sel : nutrition.calories;
            return total + (isNaN(value) ? 0 : value);
        }, 0);
    };

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

export default GaugeScreen;