import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: 16,
    },
    listContainer: {
        flexGrow: 1,
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#FFFFFF',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        borderBottomWidth: 1,
        borderBottomColor: "#FFD0A3",
    },
    tabButton: {
        paddingHorizontal: 20,
        paddingVertical: 14,
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
        fontWeight: '600',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 10,
    },
    titleText: {
        fontSize: 22,
        fontWeight: '600',
        textAlign: 'center',
        color: "#FF6B00",
        marginBottom: 8,
    },
    addButton: {
        backgroundColor: '#FF9800',
        borderRadius: 50,
        width: 48,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginVertical: 8,
        borderWidth: 1,
        borderColor: "#FFB74D",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    itemDetails: {
        flex: 1,
        marginRight: 10,
    },
    itemName: {
        fontWeight: '600',
        fontSize: 16,
        marginBottom: 5,
        color: "#E65100",
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionButton: {
        padding: 10,
        marginLeft: 6,
    },
    deleteButton: {
        backgroundColor: 'rgba(230, 81, 0, 0.1)',
        borderRadius: 8,
    },
    editButton: {
        backgroundColor: 'rgba(255, 152, 0, 0.1)',
        borderRadius: 8,
    }
});

export default styles;