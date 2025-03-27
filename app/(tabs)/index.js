import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from '@react-navigation/native';  // Importer le conteneur de navigation
import { createStackNavigator } from '@react-navigation/stack';  // Importer le stack navigator
import Homepage from "../../components/ui/homepage";  // Assurez-vous du chemin
import GaugeScreen from "../../components/ui/Gauge";  // Assurez-vous du chemin
// Assurez-vous du chemin

// Créer le stack navigator
const Stack = createStackNavigator();

export default function Index() {
    return (
        // Conteneur de navigation
            <Stack.Navigator initialRouteName="Homepage" >
                {/* Définir les écrans dans le stack */}
                <Stack.Screen name="Homepage" component={Homepage} />
                <Stack.Screen name="GaugeScreen" component={GaugeScreen} />
            </Stack.Navigator>

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
