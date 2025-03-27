import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import Homepage from "../../components/ui/homepage";  // Assurez-vous du chemin
import GaugeScreen from "../../components/ui/Gauge";  // Assurez-vous du chemin
import { StyleSheet } from "react-native";

const Stack = createStackNavigator();
import data from "../../constants/data.json";
import {Calendar} from "./Calendar.js";

export default function Index() {
    const days = data.day || [];
    const plats = data.plats || [];
    const ingredients = data.ingredients || [];

    function formatDate(inputDate) {
        const date = new Date(inputDate);
        const daysOfWeek = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
        const dayOfWeek = daysOfWeek[date.getDay()];
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        return `${dayOfWeek} ${day}/${month}`;
    }

    const daysWithPlats = days.reduce((acc, day) => {
        const platsOfDay = plats.filter((plat) => plat.id === day.plat).map((plat) => {
            const platIngredients = plat.ingredients.map((ingredient) => {
                const ingredientDetails = ingredients.find((i) => i.id === ingredient.id);
                return {
                    ...ingredient,
                    name: ingredientDetails ? ingredientDetails.name : "Ingrédient inconnu"
                };
            });
            return {
                ...plat,
                ingredients: platIngredients
            };
        });

        const existingDay = acc.find(d => d.date === day.date);
        if (existingDay) {
            existingDay.plats.push(...platsOfDay);
        } else {
            acc.push({
                date: formatDate(day.date),
                plats: platsOfDay
            });
        }
        return acc;
    }, []);

    return (
        <View style={index.container}>
            <Text style={index.text}>Bienvenue dans l'application</Text>
            <Calendar day={days} />
            <IngredientPlatsRepasScreen></IngredientPlatsRepasScreen>
            <Footer />
        </View>
            <Stack.Navigator initialRouteName="Homepage" >
                {/* Définir les écrans dans le stack */}
                <Stack.Screen name="Homepage" component={Homepage} />
                <Stack.Screen name="GaugeScreen" component={GaugeScreen} />
            </Stack.Navigator>
    );
}