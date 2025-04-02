import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF3E0",
        padding: 20,
        justifyContent: "center",
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 20,
        color: "#FF6B00",
    },
    gaugeContainer: {
        width: "100%",
        height: 20,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#FF9800",
        borderRadius: 5,
        overflow: "hidden",
        marginVertical: 10,
    },
    gaugeFill: {
        height: "100%",
        backgroundColor: "#FF9800",
    },
    gaugeText: {
        position: "absolute",
        right: 5,
        top: -5,
        fontSize: 16,
        fontWeight: "bold",
        color: "#E65100",
    },
    recoText: {
        textAlign: "center",
        marginBottom: 20,
        color: "#F57C00",
        fontStyle: "italic",
    },
});

export default styles;