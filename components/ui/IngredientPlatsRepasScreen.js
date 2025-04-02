import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import FormEdit from './FormEdit';
import FormAdd from './FormAdd';
import styles from "./IngredientPlatsRepasScreenStyle";

import { INGREDIENTS_DATA, PLATS_DATA, REPAS_DATA } from '../../constants/data';

const IngredientPlatsRepasScreen = () => {
    const [activeTab, setActiveTab] = useState('Ingrédients');
    const [showEditForm, setShowEditForm] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
    const [itemToEdit, setItemToEdit] = useState(null);
    const [ingredientsData, setIngredientsData] = useState(INGREDIENTS_DATA);
    const [platsData, setPlatsData] = useState(PLATS_DATA);
    const [repasData, setRepasData] = useState(REPAS_DATA);

    // Fonction pour calculer les valeurs nutritionnelles d'un plat
    const calculatePlatNutrition = (platIngredients) => {
        // Code existant inchangé
        if (!platIngredients || platIngredients.length === 0) return { sel: 0, calories: 0 };

        return platIngredients.reduce((total, ingredientName) => {
            const ingredient = ingredientsData.find(ing => ing.name === ingredientName);
            if (!ingredient) return total;

            return {
                sel: total.sel + (parseFloat(ingredient.sel) || 0),
                calories: total.calories + (parseFloat(ingredient.calories) || 0)
            };
        }, { sel: 0, calories: 0 });
    };

    // Fonction pour calculer les valeurs nutritionnelles d'un repas
    const calculateRepasNutrition = (repasPlats) => {
        // Code existant inchangé
        if (!repasPlats || repasPlats.length === 0) return { sel: 0, calories: 0 };

        return repasPlats.reduce((total, platName) => {
            const plat = platsData.find(p => p.name === platName);
            if (!plat) return total;

            const platNutrition = calculatePlatNutrition(plat.ingredients);

            return {
                sel: total.sel + platNutrition.sel,
                calories: total.calories + platNutrition.calories
            };
        }, { sel: 0, calories: 0 });
    };

    const handleDelete = (item) => {
        Alert.alert(
            "Confirmation",
            `Êtes-vous sûr de vouloir supprimer cet élément : ${item.name} ?`,
            [
                {
                    text: "Annuler",
                    style: "cancel"
                },
                {
                    text: "Supprimer",
                    onPress: () => {
                        switch (activeTab) {
                            case 'Ingrédients':
                                setIngredientsData(
                                    ingredientsData.filter(ing => ing.id !== item.id)
                                );
                                break;
                            case 'Plats':
                                setPlatsData(
                                    platsData.filter(plat => plat.id !== item.id)
                                );
                                break;
                            case 'Repas':
                                setRepasData(
                                    repasData.filter(repas => repas.id !== item.id)
                                );
                                break;
                        }
                    },
                    style: "destructive"
                }
            ]
        );
    };
    const handleEdit = (item) => {
        setItemToEdit(item);
        setShowEditForm(true);
    };

    const handleSaveEdit = (updatedItem) => {
        switch (activeTab) {
            case 'Ingrédients':
                setIngredientsData(
                    ingredientsData.map(item =>
                        item.id === updatedItem.id ? updatedItem : item
                    )
                );
                break;
            case 'Plats':
                setPlatsData(
                    platsData.map(item =>
                        item.id === updatedItem.id ? updatedItem : item
                    )
                );
                break;
            case 'Repas':
                setRepasData(
                    repasData.map(item =>
                        item.id === updatedItem.id ? updatedItem : item
                    )
                );
                break;
        }

        setShowEditForm(false);
        setItemToEdit(null);
    };

    const handleAddItem = (newItem) => {
        // Code existant inchangé
        switch (activeTab) {
            case 'Ingrédients':
                const newIngredient = {
                    id: (ingredientsData.length + 1).toString(),
                    name: newItem.name,
                    sel: newItem.salt,
                    calories: newItem.calories
                };
                setIngredientsData([...ingredientsData, newIngredient]);
                break;
            case 'Plats':
                const newPlat = {
                    id: (platsData.length + 1).toString(),
                    name: newItem.name,
                    ingredients: newItem.ingredients || []
                };
                setPlatsData([...platsData, newPlat]);
                break;
            case 'Repas':
                const newRepas = {
                    id: (repasData.length + 1).toString(),
                    name: newItem.name,
                    plats: newItem.plats || []
                };
                setRepasData([...repasData, newRepas]);
                break;
        }
    };

    const renderItem = ({ item }) => {
        let calories, sel;

        if (activeTab === 'Plats' && item.ingredients) {
            const nutrition = calculatePlatNutrition(item.ingredients);
            calories = nutrition.calories.toFixed(1);
            sel = nutrition.sel.toFixed(1);
        } else if (activeTab === 'Repas' && item.plats) {
            const nutrition = calculateRepasNutrition(item.plats);
            calories = nutrition.calories.toFixed(1);
            sel = nutrition.sel.toFixed(1);
        } else {
            calories = item.calories;
            sel = item.sel;
        }

        return (
            <View style={styles.itemContainer}>
                <View style={styles.itemDetails}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text>Calories : {calories}kcal</Text>
                    <Text>Sel : {sel}g</Text>
                    {item.ingredients && item.ingredients.length > 0 && (
                        <Text>Ingrédients : {item.ingredients.join(', ')}</Text>
                    )}
                    {item.plats && item.plats.length > 0 && (
                        <Text>Plats : {item.plats.join(', ')}</Text>
                    )}
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => handleEdit(item)}
                    >
                        <Feather name="edit" size={22} color="#2196F3" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.actionButton, styles.deleteButton]}
                        onPress={() => handleDelete(item)}
                    >
                        <Feather name="trash-2" size={22} color="#f44336" />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    const getDataForActiveTab = () => {
        // Code existant inchangé
        switch (activeTab) {
            case 'Ingrédients':
                return ingredientsData;
            case 'Plats':
                return platsData;
            case 'Repas':
                return repasData;
            default:
                return [];
        }
    };

    const renderContent = () => {
        // Code existant inchangé
        let title;
        switch (activeTab) {
            case 'Ingrédients':
                title = 'Ingrédients';
                break;
            case 'Plats':
                title = 'Plats';
                break;
            case 'Repas':
                title = 'Repas';
                break;
        }

        return (
            <View style={styles.contentContainer}>
                <View style={styles.headerContainer}>
                    <Text style={styles.titleText}>{title}</Text>
                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={() => setShowAddForm(true)}
                    >
                        <Feather name="plus" size={24} color="white" />
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={getDataForActiveTab()}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContainer}
                />
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.tabContainer}>
                {['Ingrédients', 'Plats', 'Repas'].map(tab => (
                    <TouchableOpacity
                        key={tab}
                        style={[
                            styles.tabButton,
                            activeTab === tab && styles.activeTabButton
                        ]}
                        onPress={() => setActiveTab(tab)}
                    >
                        <Text style={[
                            styles.tabButtonText,
                            activeTab === tab && styles.activeTabButtonText
                        ]}>
                            {tab}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
            {renderContent()}

            <FormEdit
                visible={showEditForm}
                onClose={() => {
                    setShowEditForm(false);
                    setItemToEdit(null);
                }}
                onSave={handleSaveEdit}
                itemToEdit={itemToEdit}
                currentTab={activeTab}
                ingredients={ingredientsData}
                plats={platsData}
            />

            <FormAdd
                visible={showAddForm}
                onClose={() => setShowAddForm(false)}
                onSave={(newItem) => {
                    handleAddItem(newItem);
                    setShowAddForm(false);
                }}
                currentTab={activeTab}
                ingredients={ingredientsData}
                plats={platsData}
            />
        </View>
    );
};


export default IngredientPlatsRepasScreen;