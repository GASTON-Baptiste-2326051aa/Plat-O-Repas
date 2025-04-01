import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Modal,
    StyleSheet,
    Platform,
} from "react-native";

const FormEdit = ({ visible, onClose, onSave, itemToEdit }) => {
    const [name, setName] = useState("");
    const [calories, setCalories] = useState("");
    const [salt, setSalt] = useState("");

    useEffect(() => {
        if (itemToEdit) {
            setName(itemToEdit.name || "");
            setCalories(itemToEdit.calories?.toString() || "");
            setSalt(itemToEdit.sel?.toString() || itemToEdit.salt?.toString() || "");
        }
    }, [itemToEdit, visible]);

    const handleSave = () => {
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

        const updatedItem = {
            ...itemToEdit,
            name: name.trim(),
            calories: calories.trim(),
            salt: salt.trim(),
            // Garder la compatibilité avec la structure de données existante
            sel: salt.trim()
        };

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

    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Modifier l'élément</Text>

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
                            style={[styles.button, styles.saveButton]}
                            onPress={handleSave}
                        >
                            <Text style={styles.buttonText}>Enregistrer</Text>
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
    saveButton: {
        backgroundColor: "#2196F3",
    },
    cancelButton: {
        backgroundColor: "#f44336",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },
});

export default FormEdit;