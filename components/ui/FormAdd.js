import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Modal,
    StyleSheet,
} from "react-native";
import {Button} from "react-native-web";

const FormAdd = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [name, setName] = useState("");
    const [calories, setCalories] = useState("");
    const [salt, setSalt] = useState("");

    return (
        <View style={styles.container}>
            <Button
                style={styles.floatingButton}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.plus}>+</Text>
            </Button>

            <Modal visible={modalVisible} animationType="slide" transparent={true}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <View>Nom</View>
                        <TextInput
                            style={styles.input}
                            placeholder="Nom..."
                            value={name}
                            onChangeText={setName}
                        />
                        <View>Quantité de calories (en kcal)</View>
                        <TextInput
                            style={styles.input}
                            placeholder="Calories..."
                            keyboardType="numeric"
                            value={calories}
                            onChangeText={setCalories}
                        />

                        <View>Quantité de sel (en grammes)</View>

                        <TextInput
                            style={styles.input}
                            placeholder="Sel..."
                            keyboardType="numeric"
                            value={salt}
                            onChangeText={setSalt}
                        />

                        <TouchableOpacity
                            style={styles.addButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.buttonText}>Ajouter</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.buttonText}>Annuler</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    floatingButton: {
        position: "absolute",
        bottom: 30,
        backgroundColor: "#ccc",
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
    },
    plus: {
        fontSize: 30,
        fontWeight: "bold",
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        width: "80%",
        backgroundColor: "#ddd",
        padding: 20,
        borderRadius: 10,
        alignItems: "center",
    },
    input: {
        width: "100%",
        backgroundColor: "#fff",
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
    },
    addButton: {
        backgroundColor: "#aaff77",
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },

    cancelButton: {
        backgroundColor: "#ff7777",
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },

    buttonText: {
        fontWeight: "bold",
    },

});

export default FormAdd;
