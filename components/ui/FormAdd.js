import React, { useState } from "react";
import styles from "../../assets/styles/FormStyle";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Modal,
    ScrollView,
    FlatList,
} from "react-native";

const FormAdd = ({ visible, onClose, onSave, currentTab, ingredients = [], plats = [] }) => {
    const [name, setName] = useState("");
    const [calories, setCalories] = useState("");
    const [salt, setSalt] = useState("");
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [selectedPlats, setSelectedPlats] = useState([]);

    const handleSave = () => {
        if (!name.trim()) {
            alert("Veuillez entrer un nom.");
            return;
        }

        if (currentTab === "Ingrédients") {
            if (!calories.trim() || parseFloat(calories) > 300) {
                alert("Veuillez entrer une valeur pour les calories (max 300).");
                return;
            }

            if (!salt.trim() || parseFloat(salt) > 1) {
                alert("Veuillez entrer une valeur pour le sel (max 1g).");
                return;
            }
        }

        if (currentTab === "Plats" && selectedIngredients.length === 0) {
            alert("Veuillez sélectionner au moins un ingrédient.");
            return;
        }

        if (currentTab === "Repas" && selectedPlats.length === 0) {
            alert("Veuillez sélectionner au moins un plat.");
            return;
        }

        const newItem = {
            name: name.trim(),
        };

        if (currentTab === "Ingrédients") {
            newItem.calories = calories.trim();
            newItem.salt = salt.trim();
        }

        if (currentTab === "Plats") {
            newItem.ingredients = selectedIngredients.map(ing => ing.name);
        }

        if (currentTab === "Repas") {
            newItem.plats = selectedPlats.map(plat => plat.name);
        }

        if (onSave) {
            onSave(newItem);
        }

        resetForm();
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
        setSelectedPlats([]);
    };

    const toggleIngredientSelection = (ingredient) => {
        const isSelected = selectedIngredients.some(ing => ing.id === ingredient.id);

        if (isSelected) {
            setSelectedIngredients(selectedIngredients.filter(ing => ing.id !== ingredient.id));
        } else {
            setSelectedIngredients([...selectedIngredients, ingredient]);
        }
    };

    const togglePlatSelection = (plat) => {
        const isSelected = selectedPlats.some(p => p.id === plat.id);

        if (isSelected) {
            setSelectedPlats(selectedPlats.filter(p => p.id !== plat.id));
        } else {
            setSelectedPlats([...selectedPlats, plat]);
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

    const renderPlatItem = ({ item }) => {
        const isSelected = selectedPlats.some(p => p.id === item.id);

        return (
            <TouchableOpacity
                style={[
                    styles.ingredientItem,
                    isSelected && styles.selectedIngredientItem
                ]}
                onPress={() => togglePlatSelection(item)}
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

                        {/* Afficher les champs de calories et sel uniquement pour les ingrédients */}
                        {currentTab === "Ingrédients" && (
                            <>
                                <Text style={styles.label}>Quantité de calories (en kcal)</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Calories..."
                                    keyboardType='numeric'
                                    value={calories}
                                    onChangeText={setCalories}
                                />

                                <Text style={styles.label}>Quantité de sel (en grammes)</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Sel..."
                                    keyboardType='numeric'
                                    value={salt}
                                    onChangeText={setSalt}
                                />
                            </>
                        )}

                        {/* Message informatif pour plats et repas */}
                        {currentTab === "Plats" && (
                            <Text style={styles.infoText}>
                                Les calories et le sel seront calculés automatiquement en fonction des ingrédients sélectionnés.
                            </Text>
                        )}

                        {currentTab === "Repas" && (
                            <Text style={styles.infoText}>
                                Les calories et le sel seront calculés automatiquement en fonction des plats sélectionnés.
                            </Text>
                        )}

                        {currentTab === "Plats" && ingredients.length > 0 && (
                            <View style={styles.ingredientsSection}>
                                <Text style={styles.label}>Sélectionner les ingrédients</Text>
                                <FlatList
                                    data={ingredients}
                                    renderItem={renderIngredientItem}
                                    keyExtractor={item => item.id}
                                    style={styles.ingredientsList}
                                    scrollEnabled={true}
                                    nestedScrollEnabled={true}
                                />
                            </View>
                        )}

                        {currentTab === "Repas" && plats.length > 0 && (
                            <View style={styles.ingredientsSection}>
                                <Text style={styles.label}>Sélectionner les plats</Text>
                                <FlatList
                                    data={plats}
                                    renderItem={renderPlatItem}
                                    keyExtractor={item => item.id}
                                    style={styles.ingredientsList}
                                    scrollEnabled={true}
                                    nestedScrollEnabled={true}
                                />
                            </View>
                        )}

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={[styles.button, styles.cancelButton]}
                                onPress={handleCancel}
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


export default FormAdd;