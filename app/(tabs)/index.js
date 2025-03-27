import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Footer from "../../components/ui/footer";  // Vérifie le chemin d'importation
import Gauge from "../../components/ui/Gauge";
import FormAdd from "../../components/ui/FormAdd";
import IngredientPlatsRepasScreen from "../../components/ui/IngredientPlatsRepasScreen";
import { createStackNavigator } from '@react-navigation/stack';  // Importer le stack navigator
import Homepage from "../../components/ui/homepage";  // Assurez-vous du chemin
import GaugeScreen from "../../components/ui/Gauge";  // Assurez-vous du chemin
import { StyleSheet } from "react-native";
import {NavigationContainer} from "@react-navigation/native";

const Stack = createStackNavigator();

export default function Index() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Bienvenue dans l'application</Text>
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
