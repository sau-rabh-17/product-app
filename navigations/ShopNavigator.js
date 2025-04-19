
import React, { useState } from 'react'
import AuthNavigator from './AuthNavigator';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';

import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrderScreen from '../screens/shop/OrderScreen';
import UserProdutScreen from '../screens/user/UserProdutScreen';
import EditProductScreen from '../screens/user/EditProductScreen';

import Colors from '../constants/Colors';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const ProductsNavigator = () => {
    return(
        <Stack.Navigator
          screenOptions={{
            headerStyle:{
                backgroundColor: Colors.primary,
            },
            headerTintColor: Colors.accent,
          }}>
            <Stack.Screen name="ProductsOverview" component={ProductsOverviewScreen}/>
            <Stack.Screen name="ProductDetails" component={ProductDetailScreen}/>
            <Stack.Screen name="CartScreen" component={CartScreen}/>
            <Stack.Screen name="OrderScreen" component={OrderScreen}/>
        </Stack.Navigator>
    )
}


const OrderNavigator = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name="OrderScreen" component={OrderScreen}/>
        </Stack.Navigator>
    )
}
const UserProdNavigator = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name="UserProsuct" component={UserProdutScreen}/>
            <Stack.Screen name="EditScreen" component={EditProductScreen}/>
        </Stack.Navigator>
    )
}
const TabNavigator = () => {
    return(
        <Tab.Navigator
        screenOptions={{
            headerShown: false
        }}>
            <Tab.Screen name="ProductScreen" component={ProductsNavigator}/>
            <Tab.Screen name="Ordernavigator" component={OrderNavigator}/>
            <Tab.Screen name="UserNavigator" component={UserProdNavigator}/>
        </Tab.Navigator>
    )
}



export default function ShopNavigator() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
  
    return (
      <NavigationContainer>
        {isAuthenticated ? (
          <TabNavigator />
        ) : (
          <AuthNavigator setIsAuthenticated={setIsAuthenticated} />
        )}
      </NavigationContainer>
    );
  }
