import React, {useState, useContext, createContext} from "react";
import {Text, View} from "react-native";
import Footer from "../../components/ui/footer";
import IngredientPlatsRepasScreen from "../../components/ui/IngredientPlatsRepasScreen";
import {createStackNavigator} from '@react-navigation/stack';

import { INGREDIENTS_DATA, PLATS_DATA, REPAS_DATA } from "../../constants/data";
import {Calendar} from "../../components/ui/Calendar.js";
import GaugeScreen from "../../components/ui/Gauge";
import {index as styles} from "../../assets/style/style.js";

// Create data context
export const DataContext = createContext();

const Stack = createStackNavigator();

export default function Index() {
    // Centralized state management
    const [ingredientsData, setIngredientsData] = useState(INGREDIENTS_DATA || []);
    const [platsData, setPlatsData] = useState(PLATS_DATA || []);
    const [repasData, setRepasData] = useState(REPAS_DATA || []);
    const [activeTab, setActiveTab] = useState(0);

    function formatDate(inputDate) {
        const date = new Date(inputDate);
        const daysOfWeek = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
        const dayOfWeek = daysOfWeek[date.getDay()];
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        return `${dayOfWeek} ${day}/${month}`;
    }

    const daysWithPlats = repasData.reduce((acc, day) => {
        const platsOfDay = platsData.filter((plat) => plat.id === day.plat).map((plat) => {
            const platIngredients = plat.ingredients.map((ingredient) => {
                const ingredientDetails = ingredientsData.find((i) => i.id === ingredient.id);
                return {
                    ...ingredient,
                    name: ingredientDetails ? ingredientDetails.name : "Ingrédient inconnu"
                };
            });
            return {
                ...plat,
                ingredients: platIngredients
            };
        });

        const existingDay = acc.find(d => d.date === day.date);
        if (existingDay) {
            existingDay.plats.push(...platsOfDay);
        } else {
            acc.push({
                date: formatDate(day.date),
                plats: platsOfDay
            });
        }
        return acc;
    }, []);

    // Create context value with data and setter functions
    const contextValue = {
        ingredientsData,
        setIngredientsData,
        platsData,
        setPlatsData,
        repasData,
        setRepasData
    };

    return (
        <DataContext.Provider value={contextValue}>
            <View style={styles.container}>
                <View style={styles.contentContainer}>
                    {activeTab === 0 && <Calendar days={daysWithPlats}/>}
                    {activeTab === 1 && <IngredientPlatsRepasScreen />}
                    {activeTab === 2 && <GaugeScreen />}
                </View>
                <Footer setActiveTab={setActiveTab}/>
            </View>
        </DataContext.Provider>
    );
}