import React, { useState, useEffect, useContext } from "react";
import { FlatList, Text, View } from "react-native";
import styles from "../../assets/styles/CalendarStyle";
import { DataContext } from '../../app/(tabs)/index'; // Import the context

export function Calendar({ days }) {
    const [calendarData, setCalendarData] = useState([]);

    const { repasData, platsData } = useContext(DataContext);

    useEffect(() => {
        const generateCalendarData = () => {
            const data = [];
            const today = new Date();

            for (let i = 0; i < 7; i++) {
                const currentDate = new Date(today);
                currentDate.setDate(today.getDate() + i);

                const dateString = currentDate.toLocaleDateString('fr-FR', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long'
                });

                const dayRepas = [];
                if (repasData && repasData.length > 0) {
                    const numberOfMeals = Math.floor(Math.random() * 3) + 1;

                    for (let j = 0; j < numberOfMeals; j++) {
                        const randomIndex = Math.floor(Math.random() * repasData.length);
                        const selectedRepas = repasData[randomIndex];

                        if (!dayRepas.some(repas => repas.id === selectedRepas.id)) {
                            dayRepas.push({
                                id: selectedRepas.id,
                                name: selectedRepas.name,
                                plats: selectedRepas.plats
                            });
                        }
                    }
                }

                data.push({
                    date: dateString,
                    id: i.toString(),
                    repas: dayRepas
                });
            }

            return data;
        };

        setCalendarData(generateCalendarData());
    }, [repasData]);

    const renderMeal = (repas) => {
        return (
            <View style={styles.repasContainer}>
                <Text style={styles.repasText}>{repas.name}</Text>
                {repas.plats && repas.plats.length > 0 ? (
                    <Text style={styles.platList}>
                        Plats: {repas.plats.join(', ')}
                    </Text>
                ) : null}
            </View>
        );
    };

    if (calendarData.length === 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Chargement du calendrier...</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={calendarData}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => (
                <View style={styles.dayContainer}>
                    <Text style={styles.dateText}>{item.date}</Text>
                    <View style={styles.repasListContainer}>
                        {item.repas && item.repas.length > 0 ? (
                            item.repas.map((repas, index) => (
                                <View key={index}>
                                    {renderMeal(repas)}
                                </View>
                            ))
                        ) : (
                            <Text style={styles.emptyText}>Aucun repas prévu</Text>
                        )}
                    </View>
                </View>
            )}
            contentContainerStyle={styles.listContainer}
        />
    );
}