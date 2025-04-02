import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    mainContainer: {
        flex: 1,
        width: '100%'
    },
    listContainer: {
        paddingBottom: 20,
    },
    dayContainer: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 12,
        marginVertical: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        borderWidth: 1,
        borderColor: "#FFB74D",
    },
    dateText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#FF6B00',
        textTransform: 'capitalize',
    },
    repasListContainer: {
        marginTop: 5,
    },
    repasContainer: {
        backgroundColor: '#FFF3E0',
        borderRadius: 6,
        padding: 8,
        marginVertical: 4,
        borderWidth: 1,
        borderColor: "#FFB74D",
    },
    repasText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#E65100',
    },
    platList: {
        fontSize: 14,
        color: '#F57C00',
        marginTop: 4,
    },
    emptyText: {
        fontStyle: 'italic',
        color: '#F57C00',
        textAlign: 'center',
        marginTop: 8,
    },
    text: {
        textAlign: 'center',
        fontSize: 16,
        color: '#F57C00',
        marginTop: 20,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FFD0A3'
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "#FF6B00"
    },
    addButton: {
        backgroundColor: '#FF9800',
        borderRadius: 20,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 4,
    }
});

export default styles;