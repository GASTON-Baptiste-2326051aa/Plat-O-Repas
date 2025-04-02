import React, { useState, useEffect } from "react";
import styles from "../../assets/styles/FormStyle";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Modal,
    FlatList,
    ScrollView,
} from "react-native";

const FormEdit = ({ visible, onClose, currentTab, onSave, itemToEdit, ingredients = [], plats = [] }) => {
    const [name, setName] = useState("");
    const [calories, setCalories] = useState("");
    const [salt, setSalt] = useState("");
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [selectedPlats, setSelectedPlats] = useState([]);

    useEffect(() => {
        if (itemToEdit) {
            setName(itemToEdit.name || "");
            setCalories(itemToEdit.calories?.toString() || "");
            setSalt(itemToEdit.sel?.toString() || itemToEdit.salt?.toString() || "");

            // Si on édite un plat, initialiser les ingrédients sélectionnés
            if (currentTab === "Plats" && itemToEdit.ingredients) {
                const selectedIngs = ingredients.filter(ing =>
                    itemToEdit.ingredients.includes(ing.name)
                );
                setSelectedIngredients(selectedIngs);
            }

            // Si on édite un repas, initialiser les plats sélectionnés
            if (currentTab === "Repas" && itemToEdit.plats) {
                const selectedPlts = plats.filter(p =>
                    itemToEdit.plats.includes(p.name)
                );
                setSelectedPlats(selectedPlts);
            }
        }
    }, [itemToEdit, visible, ingredients, plats, currentTab]);

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

        const updatedItem = {
            ...itemToEdit,
            name: name.trim(),
        };

        if (currentTab === "Ingrédients") {
            updatedItem.calories = calories.trim();
            updatedItem.salt = salt.trim();
            updatedItem.sel = salt.trim();
        }

        if (currentTab === "Plats") {
            updatedItem.ingredients = selectedIngredients.map(ing => ing.name);
            const nutrition = calculatePlatNutrition(updatedItem.ingredients);
            if (nutrition.calories > 800 || nutrition.sel > 5) {
                alert("Les valeurs nutritionnelles dépassent les limites (800 calories, 5g de sel).");
                return;
            }
        }

        if (currentTab === "Repas") {
            updatedItem.plats = selectedPlats.map(plat => plat.name);
            const nutrition = calculateRepasNutrition(updatedItem.plats);
            if (nutrition.calories > 1500 || nutrition.sel > 10) {
                alert("Les valeurs nutritionnelles dépassent les limites (1500 calories, 10g de sel).");
                return;
            }
        }

        if (onSave) {
            onSave(updatedItem);
        }

        if (onClose) {
            onClose();
        }
    };

    const handleCancel = () => {
        if (onClose) {
            onClose();
        }
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
                        <Text style={styles.modalTitle}>Modifier l'élément</Text>

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

                        {/* Sélection des ingrédients pour les plats */}
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

                        {/* Sélection des plats pour les repas */}
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
                                style={[styles.button, styles.saveButton]}
                                onPress={handleSave}
                            >
                                <Text style={styles.buttonText}>Enregistrer</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};


export default FormEdit;