import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Modal,
    StyleSheet,
    Platform,
} from "react-native";

// Modification pour supporter à la fois web et mobile
const ButtonComponent = Platform.OS === 'web'
    ? require('react-native-web').Button
    : TouchableOpacity;

const FormAdd = ({ visible, onClose, onSave }) => {
    const [name, setName] = useState("");
    const [calories, setCalories] = useState("");
    const [salt, setSalt] = useState("");

    const handleSave = () => {
        // Validation de base
        if (!name.trim()) {
            alert("Veuillez entrer un nom");
            return;
        }

        if (!calories.trim()) {
            alert("Veuillez entrer une valeur pour les calories");
            return;
        }

        if (!salt.trim()) {
            alert("Veuillez entrer une valeur pour le sel");
            return;
        }

        // Créer un objet avec les données du formulaire
        const newItem = {
            name: name.trim(),
            calories: calories.trim(),
            salt: salt.trim()
        };

        // Appeler la fonction de callback pour sauvegarder
        if (onSave) {
            onSave(newItem);
        }

        // Réinitialiser le formulaire
        setName("");
        setCalories("");
        setSalt("");

        // Fermer le modal
        if (onClose) {
            onClose();
        }
    };

    const handleCancel = () => {
        // Réinitialiser le formulaire
        setName("");
        setCalories("");
        setSalt("");

        // Fermer le modal
        if (onClose) {
            onClose();
        }
    };

    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Ajouter un élément</Text>

                    <Text style={styles.label}>Nom</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Nom..."
                        value={name}
                        onChangeText={setName}
                    />

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

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.button, styles.addButton]}
                            onPress={handleSave}
                        >
                            <Text style={styles.buttonText}>Ajouter</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.button, styles.cancelButton]}
                            onPress={handleCancel}
                        >
                            <Text style={styles.buttonText}>Annuler</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        width: "85%",
        backgroundColor: "#f8f8f8",
        padding: 20,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 10,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 15,
        color: "#333",
    },
    label: {
        fontSize: 14,
        fontWeight: "500",
        marginBottom: 5,
        color: "#555",
    },
    input: {
        width: "100%",
        backgroundColor: "#fff",
        padding: 10,
        marginBottom: 15,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
    button: {
        padding: 12,
        borderRadius: 5,
        flex: 1,
        margin: 5,
        alignItems: "center",
    },
    addButton: {
        backgroundColor: "#4CAF50",
    },
    cancelButton: {
        backgroundColor: "#f44336",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },
});

export default FormAdd;