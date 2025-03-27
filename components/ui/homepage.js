import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Footer from "./footer"; // Vérifie le chemin d'importation

const Homepage = () => {
    return(
        <View style={styles.container}>
            <Text style={styles.text}>Bienvenue dans l'application</Text>
            <Footer />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0', // Couleur de fond claire
        padding: 20,
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333', // Couleur de texte foncé pour contraster avec le fond
        textAlign: 'center',
        marginBottom: 40, // Marge pour espacer du footer
    },
});

export default Homepage;
