import { View, Text, StyleSheet, Button } from 'react-native';
import React, { useState } from 'react';
import CartItem from './CartItem';
import Colors from '../../constants/Colors';
import Card from '../UI/Card';

export default function OrderItem(props) {
    const [showDetails, setShowDetails] = useState(false);

    console.log("OrderItem Rendered - Show Details:", showDetails);
    console.log("Items Received in OrderItem:", props.items);

    return (
        <Card style={styles.orderItem}>
            <View style={styles.summary}>
                <Text style={styles.totalAmount}>${props.amount ?? '0.00'}</Text>
                <Text style={styles.date}>{props.date.toLocaleString()}</Text>
            </View>
            <Button
                color={Colors.primary}
                title={showDetails ? 'Hide Details' : 'Show Details'}
                onPress={() => {
                    setShowDetails(prevState => !prevState);
                    console.log("Toggled Show Details:", !showDetails);
                }}
            />
            {showDetails && props.items?.length > 0 ? (
                <View style={styles.detailItems}>
                    {props.items.map((cartItem) => (
                        <CartItem 
                            key={cartItem.productId} 
                            quantity={cartItem.quantity}
                            amount={cartItem.sum}
                            title={cartItem.productTitle}
                        />
                    ))}
                </View>
            ) : showDetails ? (
                <Text style={styles.noItemsText}>No items in this order.</Text>
            ) : null}
        </Card>
    );
}

const styles = StyleSheet.create({
    orderItem: {
        margin: 20,
        padding: 10,
        alignItems: 'center',
    },
    summary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 15,
    },
    totalAmount: {
        fontFamily: 'open-sans-bold',
        fontSize: 16,
    },
    date: {
        fontSize: 16,
        fontFamily: 'open-sans',
        color: '#888',
    },
    detailItems: {
        width: '100%',
    },
    noItemsText: {
        fontSize: 14,
        fontFamily: 'open-sans',
        color: '#888',
        marginTop: 10,
    },
});
