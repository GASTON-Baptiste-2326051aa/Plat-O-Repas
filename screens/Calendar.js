import React, { useState, useEffect, useContext } from "react";
import { FlatList, Text, View, TouchableOpacity } from "react-native";
import { Feather } from '@expo/vector-icons';
import styles from "../assets/styles/CalendarStyle";
import { DataContext } from '../app/(tabs)';
import MealDateForm from "../components/MealDateForm";

export function Calendar({ days }) {
    const [calendarData, setCalendarData] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const { repasData, platsData } = useContext(DataContext);

    useEffect(() => {
        const generateCalendarData = () => {
            const data = [];
            const today = new Date();

            // Créer le tableau de dates pour la semaine
            for (let i = 0; i < 7; i++) {
                const currentDate = new Date(today);
                currentDate.setDate(today.getDate() + i);

                const dateString = currentDate.toLocaleDateString('fr-FR', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long'
                });

                // Trouver les repas pour cette date
                const dayRepas = repasData
                    .filter(repas => {
                        const repasDate = new Date(repas.date);
                        return repasDate.toDateString() === currentDate.toDateString();
                    })
                    .map(repas => {
                        // Trouver les détails du plat
                        const plat = platsData.find(p => p.id === repas.plat);
                        return {
                            id: repas.id,
                            name: repas.name, // Type de repas (déjeuner, dîner, etc.)
                            platName: plat ? plat.name : "Plat inconnu",
                            plats: plat ? [plat.name] : []
                        };
                    });

                data.push({
                    date: dateString,
                    id: i.toString(),
                    repas: dayRepas
                });
            }

            return data;
        };

        setCalendarData(generateCalendarData());
    }, [repasData, platsData]);

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
        <View style={styles.mainContainer}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>Calendrier des repas</Text>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => setShowAddForm(true)}
                >
                    <Feather name="plus" size={24} color="white" />
                </TouchableOpacity>
            </View>

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

            <MealDateForm
                visible={showAddForm}
                onClose={() => setShowAddForm(false)}
            />
        </View>
    );
}