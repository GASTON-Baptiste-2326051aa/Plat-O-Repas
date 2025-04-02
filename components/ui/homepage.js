import React from "react";
import { View, Text, ScrollView } from "react-native";
import Footer from "./footer";
import IngredientPlatsRepasScreen from "./IngredientPlatsRepasScreen";
import styles from "../../assets/styles/homepageStyle";

const Homepage = () => {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.text}>Bienvenue dans l'application</Text>
                <IngredientPlatsRepasScreen />
            </ScrollView>
            <Footer />
        </View>
    );
};

export default Homepage;