import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        width: "85%",
        maxHeight: "80%",
        backgroundColor: "#FFFFFF",
        padding: 22,
        borderRadius: 16,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 6 },
        shadowRadius: 12,
        elevation: 8,
        borderWidth: 1,
        borderColor: "#FF9800",
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: "600",
        textAlign: "center",
        marginBottom: 20,
        color: "#FF6B00",
    },
    label: {
        fontSize: 15,
        fontWeight: "500",
        marginBottom: 8,
        color: "#E65100",
    },
    input: {
        width: "100%",
        backgroundColor: "#FFFFFF",
        padding: 12,
        marginBottom: 16,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#FFB74D",
    },
    infoText: {
        fontSize: 14,
        color: "#F57C00",
        fontStyle: "italic",
        marginBottom: 16,
        textAlign: "center",
        backgroundColor: "#FFF3E0",
        padding: 12,
        borderRadius: 10,
    },
    ingredientsSection: {
        marginBottom: 16,
    },
    ingredientsList: {
        maxHeight: 200,
    },
    ingredientItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 12,
        borderWidth: 1,
        borderColor: "#FFB74D",
        borderRadius: 10,
        marginBottom: 6,
        backgroundColor: "#FFFFFF",
    },
    selectedIngredientItem: {
        backgroundColor: "#FF9800",
        borderColor: "#FF9800",
    },
    ingredientName: {
        fontSize: 15,
        color: "#E65100",
    },
    selectedIngredientText: {
        color: "#FFFFFF",
        fontWeight: "600",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 15,
    },
    button: {
        padding: 14,
        borderRadius: 10,
        flex: 1,
        margin: 5,
        alignItems: "center",
    },
    addButton: {
        backgroundColor: "#FF9800",
    },
    saveButton: {
        backgroundColor: "#FF9800",
    },
    cancelButton: {
        backgroundColor: "#E0E0E0",
    },
    buttonText: {
        color: "#FFFFFF",
        fontWeight: "600",
    },
});

export default styles;