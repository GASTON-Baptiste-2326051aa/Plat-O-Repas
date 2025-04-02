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
        backgroundColor: "#FFF8F2",
        padding: 20,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 10,
        elevation: 5,
        borderWidth: 1,
        borderColor: "#FF8C00",
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 15,
        color: "#FF6B00",
    },
    label: {
        fontSize: 14,
        fontWeight: "500",
        marginBottom: 5,
        color: "#E65100",
    },
    input: {
        width: "100%",
        backgroundColor: "#fff",
        padding: 10,
        marginBottom: 15,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#FFB74D",
    },
    infoText: {
        fontSize: 14,
        color: "#F57C00",
        fontStyle: "italic",
        marginBottom: 15,
        textAlign: "center",
        backgroundColor: "#FFF3E0",
        padding: 8,
        borderRadius: 5,
    },
    ingredientsSection: {
        marginBottom: 15,
    },
    ingredientsList: {
        maxHeight: 200,
    },
    ingredientItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        borderWidth: 1,
        borderColor: "#FFB74D",
        borderRadius: 5,
        marginBottom: 5,
        backgroundColor: "#fff",
    },
    selectedIngredientItem: {
        backgroundColor: "#FF9800",
        borderColor: "#FF9800",
    },
    ingredientName: {
        fontSize: 14,
        color: "#E65100",
    },
    selectedIngredientText: {
        color: "#fff",
        fontWeight: "bold",
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
        backgroundColor: "#FF9800",
    },
    saveButton: {
        backgroundColor: "#FF9800",
    },
    cancelButton: {
        backgroundColor: "#E65100",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },
});

export default styles;