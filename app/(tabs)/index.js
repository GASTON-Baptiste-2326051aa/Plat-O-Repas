import React from "react";
import {index} from "../../assets/style/style.js";
import { View, Text } from "react-native";

import data from "../../constants/data.json";

export default function Index() {
    const days = data.days;
    const plats = data.plats;
    const ingredients = data.ingredients;

    days.forEach((day) => {
        day.plat = plats.find((plat) => plat.id === day.plat);
    });

    plats.forEach((plat) => {
        plat.ingredients = plat.ingredients.map((ingredient) => ingredients.find((i) => i.id === ingredient));
    });

    return (
        <View style={index.container}>
            <Calendar day={days} />
        </View>
    );
}
