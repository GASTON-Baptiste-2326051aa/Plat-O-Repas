import React, { useState } from 'react';
import { View, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as DocumentPicker from 'expo-document-picker';
import { useNavigation } from '@react-navigation/native';
import styles from './footerStyle';

const Footer = () => {
    const [selectedFile, setSelectedFile] = useState(null);
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

    return (
        <View style={styles.footer}>
            <View style={styles.row}>
                <TouchableOpacity style={styles.iconButton}>
                    <Icon name="calendar" size={30} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.iconButton}
                    onPress={() => navigation.navigate('GaugeScreen')}
                >
                    <Icon name="clipboard" size={30} color="#000" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Footer;