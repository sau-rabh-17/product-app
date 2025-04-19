import { View, Text, FlatList, StyleSheet, Button, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Colors from '../../constants/Colors';
import Card from '../../components/UI/Card';
import CartItem from '../../components/shop/CartItem';
import * as cartActions from '../../store/actions/cart';
import * as orderActions from '../../store/actions/order';

export default function CartScreen() {
    const [isLoading, setIsLoading] = useState(false);

    const cartTotalAmount = useSelector(state => state.cart.totalAmount);
    const cartItems = useSelector(state => {
        if (!state.cart.items) return [];
        const transformedCartItems = [];
        for (const key in state.cart.items) {
            transformedCartItems.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum,
            });
        }
        return transformedCartItems.sort((a, b) => (a.productId > b.productId ? 1 : -1));
    });

    const dispatch = useDispatch();

    const sendOrderHandler = async () => {
        setIsLoading(true);
        await dispatch(cartActions.removeFromCart(itemData.item.productId));
        setIsLoading(false);
    }

    return (
        <View style={styles.screen}>
            <Card style={styles.summary}>
                <Text style={styles.summaryText}>
                    Total: <Text style={styles.amount}>${cartTotalAmount?.toFixed(2) ?? '0.00'}</Text>
                </Text>
                {isLoading ? 
                <ActivityIndicator size='small' color={Colors.primary}/> :
                <Button
                    title='Order Now'
                    color={Colors.accent}
                    disabled={cartItems.length === 0}
                    onPress={() => {
                        dispatch(orderActions.addOrder(cartItems, cartTotalAmount));
                    }}
                />
                }
                
            </Card>
            <FlatList
                data={cartItems}
                keyExtractor={item => item.productId}
                renderItem={itemData => (
                    <CartItem
                        quantity={itemData.item.quantity}
                        title={itemData.item.productTitle}
                        amount={itemData.item.sum}
                        deletable
                        onRemove={sendOrderHandler}
                    />
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        margin: 20,
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10,
        height: 50,
        margin: 20,
    },
    summaryText: {
        fontFamily: 'open-sans-bold',
        fontSize: 18,
    },
    amount: {
        color: Colors.primary,
    },
});
