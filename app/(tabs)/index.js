import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Footer from "../../components/ui/footer";  // Vérifie le chemin d'importation
import Gauge from "../../components/ui/Gauge";
import Repas from "./Repas";
import FormAdd from "../../components/ui/FormAdd";

export default function Index() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Bienvenue dans l'application</Text>
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
