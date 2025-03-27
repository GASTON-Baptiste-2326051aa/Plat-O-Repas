import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import Homepage from "../../components/ui/homepage";  // Assurez-vous du chemin
import GaugeScreen from "../../components/ui/Gauge";  // Assurez-vous du chemin
import { StyleSheet } from "react-native";

const Stack = createStackNavigator();

export default function Index() {
    const days = data.days;
    const plats = data.plats;
    const ingredients = data.ingredients;

    days.forEach((day) => {
        day.plat = plats.find((plat) => plat.id === day.plat);
    });

    plats.forEach((plat) => {
        plat.ingredients = plat.ingredients.map((ingredient) => ingredients.find((i) => i.id === ingredient));
    });

    return (
            <Stack.Navigator initialRouteName="Homepage" >
                {/* Définir les écrans dans le stack */}
                <Stack.Screen name="Homepage" component={Homepage} />
                <Stack.Screen name="GaugeScreen" component={GaugeScreen} />
            </Stack.Navigator>
    );
}
//a
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
