import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Modal,
    StyleSheet,
    Platform,
    ScrollView,
    FlatList,
} from "react-native";

const FormAdd = ({ visible, onClose, onSave, currentTab, ingredients = [] }) => {
    const [name, setName] = useState("");
    const [calories, setCalories] = useState("");
    const [salt, setSalt] = useState("");
    const [selectedIngredients, setSelectedIngredients] = useState([]);

    const handleSave = () => {
        if (!name.trim()) {
            alert("Veuillez entrer un nom");
            return;
        }

        if (!calories.trim()) {
            alert("Veuillez entrer une valeur pour les calories");
            return;
        }

        if (!salt.trim()) {
            alert("Veuillez entrer une valeur pour le sel");
            return;
        }

        const newItem = {
            name: name.trim(),
            calories: calories.trim(),
            salt: salt.trim(),
            ingredients: selectedIngredients.map(ing => ing.name),
        };

        if (onSave) {
            onSave(newItem);
        }

        // Réinitialiser le formulaire
        resetForm();

        // Fermer le modal
        if (onClose) {
            onClose();
        }
    };

    const handleCancel = () => {
        resetForm();

        // Fermer le modal
        if (onClose) {
            onClose();
        }
    };

    const resetForm = () => {
        setName("");
        setCalories("");
        setSalt("");
        setSelectedIngredients([]);
    };

    const toggleIngredientSelection = (ingredient) => {
        const isSelected = selectedIngredients.some(ing => ing.id === ingredient.id);

        if (isSelected) {
            setSelectedIngredients(selectedIngredients.filter(ing => ing.id !== ingredient.id));
        } else {
            setSelectedIngredients([...selectedIngredients, ingredient]);
        }
    };

    const renderIngredientItem = ({ item }) => {
        const isSelected = selectedIngredients.some(ing => ing.id === item.id);

        return (
            <TouchableOpacity
                style={[
                    styles.ingredientItem,
                    isSelected && styles.selectedIngredientItem
                ]}
                onPress={() => toggleIngredientSelection(item)}
            >
                <Text style={[
                    styles.ingredientName,
                    isSelected && styles.selectedIngredientText
                ]}>
                    {item.name}
                </Text>
                <Text style={isSelected && styles.selectedIngredientText}>
                    {isSelected ? "✓" : ""}
                </Text>
            </TouchableOpacity>
        );
    };

    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <ScrollView>
                        <Text style={styles.modalTitle}>
                            {currentTab === "Plats"
                                ? "Ajouter un plat"
                                : currentTab === "Repas"
                                    ? "Ajouter un repas"
                                    : "Ajouter un ingrédient"}
                        </Text>

                        <Text style={styles.label}>Nom</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Nom..."
                            value={name}
                            onChangeText={setName}
                        />

                        <Text style={styles.label}>Quantité de calories (en kcal)</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Calories..."
                            keyboardType="numeric"
                            value={calories}
                            onChangeText={setCalories}
                        />

                        <Text style={styles.label}>Quantité de sel (en grammes)</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Sel..."
                            keyboardType="numeric"
                            value={salt}
                            onChangeText={setSalt}
                        />

                        {currentTab === "Plats" && ingredients.length > 0 && (
                            <View style={styles.ingredientsSection}>
                                <Text style={styles.label}>Sélectionner les ingrédients</Text>
                                <FlatList
                                    data={ingredients}
                                    renderItem={renderIngredientItem}
                                    keyExtractor={item => item.id}
                                    style={styles.ingredientsList}
                                    scrollEnabled={false}
                                    nestedScrollEnabled={true}
                                />
                            </View>
                        )}

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={[styles.button, styles.addButton]}
                                onPress={handleSave}
                            >
                                <Text style={styles.buttonText}>Ajouter</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.button, styles.cancelButton]}
                                onPress={handleCancel}
                            >
                                <Text style={styles.buttonText}>Annuler</Text>
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
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        width: "85%",
        maxHeight: "80%",
        backgroundColor: "#f8f8f8",
        padding: 20,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 10,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 15,
        color: "#333",
    },
    label: {
        fontSize: 14,
        fontWeight: "500",
        marginBottom: 5,
        color: "#555",
    },
    input: {
        width: "100%",
        backgroundColor: "#fff",
        padding: 10,
        marginBottom: 15,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    ingredientsSection: {
        marginBottom: 15,
    },
    ingredientsList: {
        maxHeight: 200,
    },
    ingredientItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 5,
        marginBottom: 5,
        backgroundColor: "#fff",
    },
    selectedIngredientItem: {
        backgroundColor: "#4CAF50",
        borderColor: "#4CAF50",
    },
    ingredientName: {
        fontSize: 14,
    },
    selectedIngredientText: {
        color: "#fff",
        fontWeight: "bold",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
    button: {
        padding: 12,
        borderRadius: 5,
        flex: 1,
        margin: 5,
        alignItems: "center",
    },
    addButton: {
        backgroundColor: "#4CAF50",
    },
    cancelButton: {
        backgroundColor: "#f44336",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },
});

export default FormAdd;