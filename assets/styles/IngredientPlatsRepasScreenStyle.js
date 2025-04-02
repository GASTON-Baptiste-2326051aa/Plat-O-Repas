import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF8F2",
    },
    contentContainer: {
        flex: 1, // Utilise tout l’espace vertical disponible
        paddingHorizontal: 10,
    },
    listContainer: {
        flexGrow: 1, // La liste prend tout l'espace restant
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#ffffff',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        borderBottomWidth: 1,
        borderBottomColor: "#FFD0A3",
    },
    tabButton: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    activeTabButton: {
        borderBottomWidth: 2,
        borderBottomColor: '#FF9800',
    },
    tabButtonText: {
        color: '#E65100',
    },
    activeTabButtonText: {
        color: '#FF6B00',
        fontWeight: 'bold',
    },

    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: "#FF6B00",
        marginBottom: 5,
    },
    addButton: {
        backgroundColor: '#FF9800',
        borderRadius: 50,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFF3E0',
        borderRadius: 12,
        padding: 15,
        marginVertical: 8,
        borderWidth: 1,
        borderColor: "#FFB74D",
    },
    itemDetails: {
        flex: 1,
        marginRight: 10,
    },
    itemName: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 5,
        color: "#E65100",
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionButton: {
        padding: 8,
        marginLeft: 5,
    },
    deleteButton: {
        backgroundColor: 'rgba(230, 81, 0, 0.1)',
        borderRadius: 5,
    },
    editButton: {
        backgroundColor: 'rgba(255, 152, 0, 0.1)',
        borderRadius: 5,
    }
});

export default styles;
