
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { useFonts } from 'expo-font';

import { combineReducers, applyMiddleware, create } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';


import productsReducer from './store/reducers/product';
import cartReducer from './store/reducers/cart';
import orderReducer from './store/reducers/order';
import ShopNavigator  from './navigations/ShopNavigator';

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: orderReducer,
})

const store = configureStore({
  reducer: rootReducer,
  // Correct middleware application
});

export default function App() {
  const [fontsLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <Provider store={store}>
      <ShopNavigator/>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})