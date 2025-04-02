import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, ScrollView, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Feather } from '@expo/vector-icons';
import { DataContext } from '../../app/(tabs)/index';

const MealDateForm = ({ visible, onClose }) => {
    const { repasData, setRepasData, platsData } = useContext(DataContext);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedMeal, setSelectedMeal] = useState('');
    const [selectedPlat, setSelectedPlat] = useState('');

    const formatDate = (date) => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || new Date();
        setShowDatePicker(Platform.OS === 'ios');
        setSelectedDate(currentDate);
    };

    const showDatepicker = () => {
        setShowDatePicker(true);
    };

    const availableMeals = ['Petit déjeuner', 'Déjeuner', 'Dîner', 'Collation'];

    const handleSave = () => {
        if (!selectedMeal || !selectedPlat) {
            alert('Veuillez sélectionner un repas et un plat.');
            return;
        }

        // Créer un nouvel objet repas
        const newRepas = {
            id: String(Date.now()),
            date: selectedDate.toISOString(),
            plat: selectedPlat,
            name: selectedMeal
        };

        // Ajouter le nouveau repas
        setRepasData([...repasData, newRepas]);

        // Réinitialiser le formulaire
        setSelectedMeal('');
        setSelectedPlat('');

        // Fermer le formulaire
        onClose();
    };

    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <ScrollView>
                        <Text style={styles.modalTitle}>Ajouter un repas au calendrier</Text>

                        <Text style={styles.label}>Date</Text>
                        <TouchableOpacity
                            style={styles.dateButton}
                            onPress={showDatepicker}
                        >
                            <Text style={styles.dateButtonText}>{formatDate(selectedDate)}</Text>
                            <Feather name="calendar" size={20} color="#555" />
                        </TouchableOpacity>

                        {showDatePicker && (
                            <DateTimePicker
                                value={selectedDate}
                                mode="date"
                                display="default"
                                onChange={handleDateChange}
                            />
                        )}

                        <Text style={styles.label}>Type de repas</Text>
                        <View style={styles.optionsContainer}>
                            {availableMeals.map((meal) => (
                                <TouchableOpacity
                                    key={meal}
                                    style={[
                                        styles.optionButton,
                                        selectedMeal === meal && styles.selectedOption
                                    ]}
                                    onPress={() => setSelectedMeal(meal)}
                                >
                                    <Text style={[
                                        styles.optionText,
                                        selectedMeal === meal && styles.selectedOptionText
                                    ]}>
                                        {meal}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <Text style={styles.label}>Plat</Text>
                        <View style={styles.optionsContainer}>
                            {platsData.map((plat) => (
                                <TouchableOpacity
                                    key={plat.id}
                                    style={[
                                        styles.optionButton,
                                        selectedPlat === plat.id && styles.selectedOption
                                    ]}
                                    onPress={() => setSelectedPlat(plat.id)}
                                >
                                    <Text style={[
                                        styles.optionText,
                                        selectedPlat === plat.id && styles.selectedOptionText
                                    ]}>
                                        {plat.name}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={[styles.button, styles.cancelButton]}
                                onPress={onClose}
                            >
                                <Text style={styles.buttonText}>Annuler</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, styles.addButton]}
                                onPress={handleSave}
                            >
                                <Text style={styles.buttonText}>Ajouter</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 20
    },
    modalContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        width: '100%',
        maxWidth: 500,
        maxHeight: '80%'
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center'
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 8,
        marginTop: 12
    },
    dateButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 12,
        marginBottom: 15
    },
    dateButtonText: {
        fontSize: 16
    },
    optionsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 15
    },
    optionButton: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        margin: 5
    },
    selectedOption: {
        backgroundColor: '#3498db',
        borderColor: '#3498db'
    },
    optionText: {
        color: '#333'
    },
    selectedOptionText: {
        color: 'white'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20
    },
    button: {
        flex: 1,
        padding: 12,
        borderRadius: 5,
        alignItems: 'center',
        marginHorizontal: 5
    },
    cancelButton: {
        backgroundColor: '#ccc'
    },
    addButton: {
        backgroundColor: '#3498db'
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold'
    }
});

export default MealDateForm;