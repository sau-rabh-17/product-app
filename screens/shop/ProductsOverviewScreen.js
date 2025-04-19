import { 
  View, 
  Text, 
  Button, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet, 
  ActivityIndicator 
} from 'react-native';
import React, { useLayoutEffect, useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from 'react-native-vector-icons';

import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart';
import * as productsAction from '../../store/actions/product';
import Colors from '../../constants/Colors';

export default function ProductsOverviewScreen(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);  // Set initial error to null

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.availableProducts);

  const loadProducts = useCallback(async () => {
    setError(null); // Reset the error before trying again 
    setIsRefreshing(true);
    try {
      await dispatch(productsAction.fetchProducts()); // Fetch products
    } catch (err) {
      setError('Something went wrong!');  // Set a general error message
    } finally {
      setIsRefreshing(false);
    }
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadProducts);
    return unsubscribe;
  }, [loadProducts]);
  

  useEffect(() => {
    setIsLoading(true);
    loadProducts().then(() => {
      setIsLoading(false);
    });  // Load products initially
  }, [dispatch, loadProducts]);

  // Select item handler
  const selectItemHandler = (id, title) => {
    props.navigation.navigate('ProductDetails', {
      productId: id,
      productTitle: title,
    });
  };

  // Setting header options
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Product Overview",
      headerTitleStyle: {
        fontFamily: 'open-sans-bold',
      },
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('CartScreen');
          }}
          style={styles.iconStyle}
        >
          <FontAwesome name="shopping-cart" size={25} color='white' />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  // Error handling
  if (error) {
    return (
      <View style={styles.centered}>
        <Text>Error occured</Text>
        <Button title="Try Again" onPress={loadProducts} />
      </View>
    );
  }

  // Loading indicator
  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  // No products found
  if (products.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No products available</Text>
      </View>
    );
  }

  // FlatList to render products
  return (
    <FlatList
    onRefresh={loadProducts}
    refreshing={isRefreshing}
      data={products}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {
            selectItemHandler(itemData.item.id, itemData.item.title);
          }}
        >
          <Button
            color={Colors.primary}
            title="View Details"
            onPress={() => {
              selectItemHandler(itemData.item.id, itemData.item.title);
            }}
          />
          <Button
            color={Colors.primary}
            title="To Cart"
            onPress={() => {
              dispatch(cartActions.addToCart(itemData.item));
            }}
          />
        </ProductItem>
      )}
    />
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {
    marginRight: 20,
  },
});
