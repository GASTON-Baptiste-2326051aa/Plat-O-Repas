import React from "react";
import {FlatList, Text, View} from "react-native";
import {calendar} from "../../assets/style/style.js";

export function Calendar({days}) {
    if (!Array.isArray(days) || days.length === 0) {
        return (
            <View style={calendar.container}>
                <Text style={calendar.text}>Aucune donnée disponible</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={days}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
                <View style={calendar.dayContainer}>
                    <Text style={calendar.dateText}>{item.date}</Text>
                    {item.plats && item.plats.length > 0 ? (
                        item.plats.map((plat, platIndex) => (
                            <Text key={platIndex} style={calendar.platText}>
                                {plat.name}
                            </Text>
                        ))
                    ) : (
                        <Text style={calendar.platText}>Aucun plat disponible</Text>
                    )}
                </View>
            )}
            contentContainerStyle={calendar.container}
        />
    );
}