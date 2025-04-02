import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import FormEdit from './FormEdit';
import FormAdd from './FormAdd';
import styles from "../../assets/styles/IngredientPlatsRepasScreenStyle";
import { DataContext } from '../../app/(tabs)/index'; // Import the context

const IngredientPlatsRepasScreen = () => {
    const [activeTab, setActiveTab] = useState('Ingrédients');
    const [showEditForm, setShowEditForm] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
    const [itemToEdit, setItemToEdit] = useState(null);

    // Use the central context instead of local state
    const {
        ingredientsData,
        setIngredientsData,
        platsData,
        setPlatsData,
        repasData,
        setRepasData
    } = useContext(DataContext);

    const calculatePlatNutrition = (platIngredients) => {
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

    const calculateRepasNutrition = (repasPlats) => {
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
        switch (activeTab) {
            case 'Ingrédients':
                if (parseFloat(newItem.calories) > 300) {
                    alert("Les calories doivent être inférieures ou égales à 300.");
                    return;
                }
                if (parseFloat(newItem.salt) > 1) {
                    alert("Le sel doit être inférieur ou égal à 1g.");
                    return;
                }
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
                const platNutrition = calculatePlatNutrition(newPlat.ingredients);
                if (platNutrition.calories > 800 || platNutrition.sel > 5) {
                    alert("Les valeurs nutritionnelles dépassent les limites (800 calories, 5g de sel).");
                    return;
                }
                setPlatsData([...platsData, newPlat]);
                break;
            case 'Repas':
                const newRepas = {
                    id: (repasData.length + 1).toString(),
                    name: newItem.name,
                    plats: newItem.plats || []
                };
                const repasNutrition = calculateRepasNutrition(newRepas.plats);
                if (repasNutrition.calories > 1500 || repasNutrition.sel > 10) {
                    alert("Les valeurs nutritionnelles dépassent les limites (1500 calories, 10g de sel).");
                    return;
                }
                setRepasData([...repasData, newRepas]);
                break;
        }
    };

    // Rest of the component remains the same...

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
                <ScrollView style={styles.container} nestedScrollEnabled={true} scrollEnabled={true}>
                    <FlatList
                        data={getDataForActiveTab()}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        contentContainerStyle={styles.listContainer}
                        scrollEnabled={true}
                        nestedScrollEnabled={true}
                    />
                </ScrollView>
            </View>
        );
    };

    return (
        <ScrollView style={styles.container} nestedScrollEnabled={true} >
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
        </ScrollView>
    );
};

export default IngredientPlatsRepasScreen;