import React, {useState} from 'react';
import {Alert, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as DocumentPicker from 'expo-document-picker';
import {useNavigation} from '@react-navigation/native';
import styles from './../../assets/styles/footerStyle';

const Footer = ({setActiveTab}) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const navigation = useNavigation();

    const handleImport = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: 'application/json',
            });
            if (result.type === 'success') {
                setSelectedFile(result);
                Alert.alert('Fichier sélectionné', `Nom du fichier: ${result.name}`);
            } else {
                console.log('Sélection de fichier annulée');
            }
        } catch (err) {
            console.error('Erreur lors de la sélection du fichier:', err);
            Alert.alert('Erreur', 'Une erreur est survenue lors de la sélection du fichier');
        }
    };

    const handleFormSave = (item) => {
        console.log('Item sauvegardé:', item);
        Alert.alert('Élément ajouté', `Nom: ${item.name}\nCalories: ${item.calories} kcal\nSel: ${item.salt} g`);
    };

    return (
        <View style={styles.footer}>
            <View style={styles.row}>
                <TouchableOpacity style={styles.iconButton} onPress={() => setActiveTab(0)}>
                    <Icon name="calendar" size={30} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton} onPress={() => setActiveTab(1)}>
                    <Icon name="clipboard" size={30} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton} onPress={handleImport}>
                    <Icon name="download" size={30} color="#000"/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton} onPress={() => setActiveTab(2)}>
                    <Icon name="link" size={30} color="#000"/>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.addButton}>
                <Icon name="add" size={40} color="#fff"/>
            </TouchableOpacity>
        </View>
    );
};

export default Footer;
