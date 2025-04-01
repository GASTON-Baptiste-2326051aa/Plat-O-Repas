import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Footer from "./footer";
import IngredientPlatsRepasScreen from "./IngredientPlatsRepasScreen";

const Homepage = () => {
    return(
        <View style={styles.container}>
            <Text style={styles.text}>Bienvenue dans l'application</Text>
            <IngredientPlatsRepasScreen></IngredientPlatsRepasScreen>
            <Footer />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        padding: 20,
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 40,
    },
});

export default Homepage;
