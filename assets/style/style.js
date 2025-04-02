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
    content: {
        flex: 1,
        marginBottom: 60,
    },
    contentContainer: {
        flex: 1,
        marginBottom: 60,
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

export const footer = StyleSheet.create({
    footer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: '#fff',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
    iconButton: {
        padding: 10,
    },
    addButton: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        backgroundColor: '#000',
        borderRadius: 50,
        padding: 10,
    },
    tabContainer: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    tab: {
        flex: 1,
        padding: 16,
        alignItems: "center",
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: "#000",
    },
    tabText: {
        fontSize: 16,
    },
    contentContainer: {
        padding: 16,
    },
});