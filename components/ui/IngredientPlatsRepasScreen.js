import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

const INGREDIENTS_DATA = [
    { id: '1', name: 'Tomate', sel: '2g', calories: '20 kcal' },
    { id: '2', name: 'Salade', sel: '1g', calories: '15 kcal' },
    { id: '3', name: 'Ail', sel: '3g', calories: '30 kcal' }
];

const PLATS_DATA = [
    { id: '1', name: 'Salade de tomates', ingredients: ['Tomate'], sel: '2g', calories: '20 kcal' },
    { id: '2', name: 'Salade verte', ingredients: ['Salade'], sel: '1g', calories: '15 kcal' }
];

const REPAS_DATA = [
    { id: '1', name: 'Déjeuner', plats: ['Salade de tomates'], sel: '2g', calories: '20 kcal' },
    { id: '2', name: 'Dîner', plats: ['Salade verte'], sel: '1g', calories: '15 kcal' }
];

const IngredientPlatsRepasScreen = () => {
    const [activeTab, setActiveTab] = useState('Ingrédient');

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text>Sel : {item.sel}</Text>
                <Text>Calories : {item.calories}</Text>
            </View>
            <TouchableOpacity style={styles.editButton}>
                <Feather name="edit" size={24} color="black" />
            </TouchableOpacity>
        </View>
    );

    const renderContent = () => {
        let data, title;
        switch (activeTab) {
            case 'Ingrédient':
                data = INGREDIENTS_DATA;
                title = 'Ingrédients';
                break;
            case 'Plat':
                data = PLATS_DATA;
                title = 'Plats';
                break;
            case 'Repas':
                data = REPAS_DATA;
                title = 'Repas';
                break;
        }

        return (
            <View style={styles.contentContainer}>
                <Text style={styles.titleText}>{title}</Text>
                <FlatList
                    data={data}
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
                {['Ingrédient', 'Plat', 'Repas'].map(tab => (
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