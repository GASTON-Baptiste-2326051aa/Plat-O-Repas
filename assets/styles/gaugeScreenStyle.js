import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ddd",
        padding: 20,
        justifyContent: "center",
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 20,
    },
    gaugeContainer: {
        width: "100%",
        height: 20,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#000",
        borderRadius: 5,
        overflow: "hidden",
        marginVertical: 10,
    },
    gaugeFill: {
        height: "100%",
        backgroundColor: "#a3a3a3",
    },
    gaugeText: {
        position: "absolute",
        right: 5,
        top: -5,
        fontSize: 16,
        fontWeight: "bold",
    },
    recoText: {
        textAlign: "center",
        marginBottom: 20,
    },
});
