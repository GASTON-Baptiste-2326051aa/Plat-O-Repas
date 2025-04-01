import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#FFF3E0',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#FFB74D',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    iconButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
    },
    addButton: {
        position: 'absolute',
        bottom: 60,
        left: '50%',
        transform: [{ translateX: -20 }],
        backgroundColor: '#3498db',
        borderRadius: 30,
        padding: 15,
    },
});

export default styles;