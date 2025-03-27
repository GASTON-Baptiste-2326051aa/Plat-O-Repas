import React from "react";
import { View, Text } from "react-native";
import {BorderlessButton} from "react-native-gesture-handler";

export default function JaugeScreen() {
return (
    <View>
        <Text>Taux de sel</Text>
        <BorderlessButton>1g</BorderlessButton>
        <Text>Il est recommandé de prendre moins de 5g par jour</Text>

        <Text>Taux de calorie</Text>
        <BorderlessButton>1700kcal</BorderlessButton>
        <Text>Il est recommandé de prendre plus de 2000kcal par jour</Text>


    </View>


    )


}