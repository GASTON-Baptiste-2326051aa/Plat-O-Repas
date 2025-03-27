import React from "react";
import { View, Text } from "react-native";
import { calendar } from "../../assets/style/style.js";

export function Calendar({ days }) {
    return (
        <View style={calendar.container}>
            {days.map((day, index) => (
                <View key={index} style={calendar.dayContainer}>
                    <Text style={calendar.dateText}>{day.date}</Text>
                    {day.plats.map((plat, platIndex) => (
                        <Text key={platIndex} style={calendar.platText}>
                            {plat.name}
                        </Text>
                    ))}
                </View>
            ))}
        </View>
    );
}