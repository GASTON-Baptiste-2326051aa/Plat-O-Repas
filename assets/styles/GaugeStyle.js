import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        padding: 20,
        justifyContent: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "600",
        textAlign: "center",
        marginTop: 20,
        color: "#FF6B00",
    },
    gaugeContainer: {
        width: "100%",
        height: 24,
        backgroundColor: "#FFF3E0",
        borderWidth: 1,
        borderColor: "#FFB74D",
        borderRadius: 12,
        overflow: "hidden",
        marginVertical: 12,
    },
    gaugeFill: {
        height: "100%",
        backgroundColor: "#FF9800",
    },
    gaugeText: {
        position: "absolute",
        right: 10,
        top: -5,
        fontSize: 16,
        fontWeight: "600",
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