import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from 'react-native-vector-icons';


import ProductItem from '../../components/shop/ProductItem'
import Colors from '../../constants/Colors';
import * as productsAction from '../../store/actions/product'

export default function UserProdutScreen() {

    const navigation = useNavigation();
    const dispatch = useDispatch();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "Your Products",
            headerRight: () => (
                <TouchableOpacity
                    style={{ marginRight: 10 }}
                    onPress={() => {
                        navigation.navigate('EditScreen')
                    }}
                >
                    <FontAwesome name="pencil" size={23} color='black' />
                </TouchableOpacity>
            )
        })
    }, [navigation])

    const userProducts = useSelector(state => state.products.userProducts);
    const editProductHandler = (id) => {
        navigation.navigate('EditScreen', { productId: id })
    }

    const deleteHandler = (id) => {
        Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
            { text: 'No', style: 'default' },
            {
                text: 'Yes', style: 'destructive',
                onPress: () => {
                    dispatch(productsAction.deleteProduct(id))
                }
            },

        ])
    }


    return (
        <FlatList
            data={userProducts}
            keyExtractor={item => item.id}
            renderItem=
            {itemData =>
                <ProductItem
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onSelect={() => {
                        editProductHandler(itemData.item.id)
                    }}
                >
                    <Button
                        color={Colors.primary}
                        title="Edit"
                        onPress={() => {
                            editProductHandler(itemData.item.id)
                        }}
                    />
                    <Button
                        color={Colors.primary}
                        title="Delete"
                        onPress={deleteHandler.bind(this, itemData.item.id)}
                    />
                </ProductItem>
            }
        />
    )
}

const styles = StyleSheet.create({

})