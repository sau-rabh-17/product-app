import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { FontAwesome } from 'react-native-vector-icons';

export default function CartItem(props) {
    return (
        <View style={styles.cartItem}>
            <Text style={styles.itemData}>
                <Text style={styles.quantity}>{props.quantity} </Text>
                <Text style={styles.minText}>{props.title}</Text>
            </Text>
            <View style={styles.itemData}>
                <Text style={styles.minText}>${props.amount ?? '0.00'}</Text>
                {props.deletable && (
                <TouchableOpacity onPress={props.onRemove} style={styles.deleteButton}>
                    <FontAwesome name='trash' size={23} color='red' />
                </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    cartItem: {
        padding: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
    },
    itemData: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantity: {
        fontFamily: 'open-sans',
        color: '#888',
        fontSize: 18,
    },
    minText: {
        fontFamily: 'open-sans-bold',
        fontSize: 16,
    },
    deleteButton: {
        margin: 20,
    },
});
