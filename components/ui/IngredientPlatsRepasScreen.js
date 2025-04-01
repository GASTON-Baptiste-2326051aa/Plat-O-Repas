import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import FormEdit from './FormEdit';
import FormAdd from './FormAdd';

const INGREDIENTS_DATA = [
];

const PLATS_DATA = [

];

export const REPAS_DATA = [

];

const IngredientPlatsRepasScreen = () => {
    const [activeTab, setActiveTab] = useState('Ingrédients');
    const [showEditForm, setShowEditForm] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
    const [itemToEdit, setItemToEdit] = useState(null);
    const [ingredientsData, setIngredientsData] = useState(INGREDIENTS_DATA);
    const [platsData, setPlatsData] = useState(PLATS_DATA);
    const [repasData, setRepasData] = useState(REPAS_DATA);

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
                    ingredients: [],
                    sel: newItem.salt,
                    calories: newItem.calories
                };
                setPlatsData([...platsData, newPlat]);
                break;
            case 'Repas':
                const newRepas = {
                    id: (repasData.length + 1).toString(),
                    name: newItem.name,
                    plats: [],
                    sel: newItem.salt,
                    calories: newItem.calories
                };
                setRepasData([...repasData, newRepas]);
                break;
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text>Sel : {item.sel}g</Text>
                <Text>Calories : {item.calories}kcal</Text>
            </View>
            <TouchableOpacity
                style={styles.editButton}
                onPress={() => handleEdit(item)}
            >
                <Feather name="edit" size={24} color="black" />
            </TouchableOpacity>
        </View>
    );

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
            />

            <FormAdd
                visible={showAddForm}
                onClose={() => setShowAddForm(false)}
                onSave={(newItem) => {
                    handleAddItem(newItem);
                    setShowAddForm(false);
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#ffffff',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    tabButton: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    activeTabButton: {
        borderBottomWidth: 2,
        borderBottomColor: '#007bff',
    },
    tabButtonText: {
        color: '#666',
    },
    activeTabButtonText: {
        color: '#007bff',
        fontWeight: 'bold',
    },
    contentContainer: {
        flex: 1,
        padding: 10,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    addButton: {
        backgroundColor: '#4CAF50',
        borderRadius: 50,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    listContainer: {
        paddingBottom: 10,
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#D3D3D3',
        borderRadius: 12,
        padding: 15,
        marginVertical: 8,
    },
    itemDetails: {
        flex: 1,
        marginRight: 10,
    },
    itemName: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 5,
    },
    editButton: {
        padding: 5,
    }
});

export default IngredientPlatsRepasScreen;