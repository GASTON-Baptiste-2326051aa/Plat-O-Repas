import React, { useState } from 'react';
import { View, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as DocumentPicker from 'expo-document-picker';
import { useNavigation } from '@react-navigation/native'; // Utilisation de useNavigation
import styles from './footerStyle';

const Footer = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const navigation = useNavigation(); // Utilisation de useNavigation

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

    return (
        <View style={styles.footer}>
            {/* Ligne du bas avec 4 boutons */}
            <View style={styles.row}>
                <TouchableOpacity style={styles.iconButton}>
                    <Icon name="calendar" size={30} color="#000" />
                </TouchableOpacity>
                {/* Bouton 2ème à partir de la gauche pour la navigation vers GaugeScreen */}
                <TouchableOpacity
                    style={styles.iconButton}
                    onPress={() => navigation.navigate('GaugeScreen')} // Assure-toi que le nom correspond bien à "GaugeScreen"
                >
                    <Icon name="clipboard" size={30} color="#000" />
                </TouchableOpacity>
                {/* Le 3e bouton "download" déclenche la fonction d'importation */}
                <TouchableOpacity style={styles.iconButton} onPress={handleImport}>
                    <Icon name="download" size={30} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton}>
                    <Icon name="link" size={30} color="#000" />
                </TouchableOpacity>
            </View>
            {/* Bouton + au centre sur la ligne du haut */}
            <TouchableOpacity style={styles.addButton}>
                <Icon name="add" size={40} color="#fff" />
            </TouchableOpacity>
        </View>
    );
};

export default Footer;
