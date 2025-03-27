import {StyleSheet} from "react-native";

export const index = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
        padding: 20,
    },
    text: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 20,
    },
});

export const calendar = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 10,
    },
    text: {
        fontSize: 18,
        color: "#000",
    },
    dayContainer: {
        borderBottomWidth: 1,
        borderBottomColor: "#f0f0f0",
        paddingVertical: 10,
        width: "100%",
        alignItems: "center",
    },
    dateText: {
        justifyContent: "left",
        alignItems: "left",
        fontSize: 18,
        color: "#333",
        fontWeight: "bold",
        marginBottom: 5,
    },
    platText: {
        fontSize: 16,
        color: "#666",
    },
    ingredientText: {
        fontSize: 14,
        color: "#999",
    },
});