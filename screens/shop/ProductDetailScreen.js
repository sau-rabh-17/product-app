import { View, Text, Image, ScrollView, StyleSheet, Button } from 'react-native'
import React, { useLayoutEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { useNavigation, useRoute } from '@react-navigation/native'

import Colors from '../../constants/Colors'
import * as cartActions from '../../store/actions/cart'

export default function ProductDetailScreen(props) {
    const route = useRoute();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    
    const productId = route?.params.productId;
    const selectedProduct = useSelector(state => state.products.availableProducts.find(prod => prod.id === productId))
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: selectedProduct.title,
            headerTitleStyle: ({
              fontFamily: 'open-sans-bold',
            })
        })
    },[navigation])
    return (
    <ScrollView>
      <Image style={styles.image} source={{uri: selectedProduct.imageUrl}}/>
      <View style={styles.action}>
      <Button title="Add to Cart" color={Colors.primary}
      onPress={() => {
        dispatch(cartActions.addToCart(selectedProduct));
      }}
      />
      </View>
      
      <Text style={styles.price}>${selectedProduct.price}</Text>
      <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
  },
  action:{
    marginVertical:10,
    alignItems: 'center',
  },
  price: {
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20,
    fontFamily: 'open-sans-bold',
  },
  description:{
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20, 
    fontFamily: 'open-sans',
  },
})