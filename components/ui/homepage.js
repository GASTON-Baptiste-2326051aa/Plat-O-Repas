import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import Footer from "./footer";
import IngredientPlatsRepasScreen from "./IngredientPlatsRepasScreen";
import { Calendar } from "./Calendar";
import GaugeScreen from "./Gauge";
import styles from "../../assets/styles/homepageStyle";

const Homepage = () => {
    const [activeTab, setActiveTab] = useState(0); // 0: Calendrier, 1: Ingrédients/Plats/Repas, 2: Gauges

    const renderContent = () => {
        switch (activeTab) {
            case 0:
                return (
                    <View style={styles.contentContainer}>
                        <Text style={styles.sectionTitle}>Calendrier des repas</Text>
                        <Calendar />
                    </View>
                );
            case 1:
                return <IngredientPlatsRepasScreen />;
            case 2:
                return <GaugeScreen />;
            default:
                return null;
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {renderContent()}
            </ScrollView>
            <Footer setActiveTab={setActiveTab} />
        </View>
    );
};

export default Homepage;