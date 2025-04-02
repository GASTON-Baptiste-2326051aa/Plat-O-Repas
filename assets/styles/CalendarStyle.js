import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
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
    },
    dateText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#2196F3',
        textTransform: 'capitalize',
    },
    repasListContainer: {
        marginTop: 5,
    },
    repasContainer: {
        backgroundColor: '#f5f5f5',
        borderRadius: 6,
        padding: 8,
        marginVertical: 4,
    },
    repasText: {
        fontSize: 16,
        fontWeight: '600',
    },
    platList: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    emptyText: {
        fontStyle: 'italic',
        color: '#999',
        textAlign: 'center',
        marginTop: 8,
    },
    text: {
        textAlign: 'center',
        fontSize: 16,
        color: '#666',
        marginTop: 20,
    }
});

export default styles;