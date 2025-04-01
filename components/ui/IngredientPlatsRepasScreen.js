import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import FormEdit from './FormEdit'; // Importez le nouveau composant

const INGREDIENTS_DATA = [
    { id: '1', name: 'Tomate', sel: '2', calories: '20' },
    { id: '2', name: 'Salade', sel: '1', calories: '15' },
    { id: '3', name: 'Ail', sel: '3', calories: '30' }
];

const PLATS_DATA = [
    { id: '1', name: 'Salade de tomates', ingredients: ['Tomate'], sel: '2', calories: '20' },
    { id: '2', name: 'Salade verte', ingredients: ['Salade'], sel: '1', calories: '15' }
];

const REPAS_DATA = [
    { id: '1', name: 'Déjeuner', plats: ['Salade de tomates'], sel: '2', calories: '20' },
    { id: '2', name: 'Dîner', plats: ['Salade verte'], sel: '1', calories: '15' }
];

const IngredientPlatsRepasScreen = () => {
    const [activeTab, setActiveTab] = useState('Ingrédient');
    const [showEditForm, setShowEditForm] = useState(false);
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
            case 'Ingrédient':
                setIngredientsData(
                    ingredientsData.map(item =>
                        item.id === updatedItem.id ? updatedItem : item
                    )
                );
                break;
            case 'Plat':
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
            case 'Ingrédient':
                return ingredientsData;
            case 'Plat':
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
            case 'Ingrédient':
                title = 'Ingrédients';
                break;
            case 'Plat':
                title = 'Plats';
                break;
            case 'Repas':
                title = 'Repas';
                break;
        }

        return (
            <View style={styles.contentContainer}>
                <Text style={styles.titleText}>{title}</Text>
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
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
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