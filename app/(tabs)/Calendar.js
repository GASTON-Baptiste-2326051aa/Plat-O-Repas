import React from "react";
import {Text, View} from "react-native";
import {calendar, index} from "../../assets/style/style.js";

export function Calendar({ days }) {
    return (
        <View style={index.container}>
            {days.map((day, index) => (
                <View key={index} style={calendar.dayContainer}>
                    <Text style={calendar.dateText}>{day.date}</Text>
                    {day.plats.length > 0 ? (
                        day.plats.map((plat, platIndex) => (
                            <Text key={platIndex} style={calendar.platText}>
                                {plat.name}
                            </Text>
                        ))
                    ) : (
                        <Text style={calendar.platText}>Aucun plat disponible</Text>
                    )}
                </View>
            ))}
        </View>
    );
}