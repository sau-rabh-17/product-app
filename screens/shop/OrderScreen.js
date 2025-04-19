import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

import { useSelector, useDispatch } from 'react-redux'

import OrderItem from '../../components/shop/OrderItem';
import * as OrdersAction from '../../store/actions/order';
import Colors from '../../constants/Colors';

export default function OrderScreen() {

    const [isLoading, setIsLoading] = useState(false);

    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: 'Your Orders'
        })
    })

    const orders = useSelector(state => state.orders.orders);
    const dispatch = useDispatch();

    useEffect(() => {
        setIsLoading(true);
        dispatch(OrdersAction.fetchOrders()).then(() => {
            setIsLoading(false);
        });
    }, [dispatch])

    if(isLoading){
        return(
            <View style={styles.centered}>
                <ActivityIndicator size='large' color={Colors.primary}/>
            </View>
        )
    }


    return <FlatList 
    data ={orders}
    keyExtractor={item => item.id}
    renderItem={itemData => 
        <OrderItem 
        amount={itemData.item.totalAmount}
        date={itemData.item.date} 
        items={itemData.item.items}
        />

    }/>
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})