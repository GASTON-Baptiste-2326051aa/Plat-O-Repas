import React, {useState} from "react";
import {Text, View} from "react-native";
import Footer from "../../components/ui/footer";
import IngredientPlatsRepasScreen from "../../components/ui/IngredientPlatsRepasScreen";
import {createStackNavigator} from '@react-navigation/stack';

import { INGREDIENTS_DATA, PLATS_DATA, REPAS_DATA } from "../../constants/data";
import {Calendar} from "../../components/ui/Calendar.js";
import {index as styles} from "../../assets/style/style.js";

const Stack = createStackNavigator();

export default function Index() {
    const [activeTab, setActiveTab] = useState(1);


    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                {activeTab === 0 && <Calendar/>}
                {activeTab === 1 && <IngredientPlatsRepasScreen/>}
                {activeTab === 2 && <Text>Contenu de l'onglet Import</Text>}
            </View>
            <Footer setActiveTab={setActiveTab}/>
        </View>
    );
}