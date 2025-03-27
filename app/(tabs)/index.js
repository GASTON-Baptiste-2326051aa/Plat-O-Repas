import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Footer from "../../components/ui/footer";  // Vérifie le chemin d'importation
import Gauge from "../../components/ui/Gauge";
import FormAdd from "../../components/ui/FormAdd";
import IngredientPlatsRepasScreen from "../../components/ui/IngredientPlatsRepasScreen";

export default function Index() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Bienvenue dans l'application</Text>
            <IngredientPlatsRepasScreen></IngredientPlatsRepasScreen>
            <Footer />
        </View>
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
