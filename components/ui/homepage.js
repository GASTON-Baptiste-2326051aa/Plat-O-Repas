import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Footer from "./footer";
import IngredientPlatsRepasScreen from "./IngredientPlatsRepasScreen";
import styles from "./homepageStyle";

const Homepage = () => {
    return(
        <View style={styles.container}>
            <Text style={styles.text}>Bienvenue dans l'application</Text>
            <IngredientPlatsRepasScreen></IngredientPlatsRepasScreen>
            <Footer />
        </View>
    );
}


export default Homepage;
