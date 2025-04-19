import {
    View,
    Text,
    Image,
    StyleSheet,
    Platform,
    TouchableOpacity,
    TouchableNativeFeedback,
  } from 'react-native';
  import React from 'react';
  
  import Colors from '../../constants/Colors';
  import Card from '../UI/Card';
  
  export default function ProductItem(props) {
    let TouchableComponent = TouchableOpacity;
  
    if (Platform.OS === 'android' && Platform.Version >= 21) {
      TouchableComponent = TouchableNativeFeedback;
    }
  
    return (
      <View style={styles.touchableContainer}>
        <TouchableComponent onPress={props.onSelect} useForeground>
          <View style={{ borderRadius: 10, overflow: 'hidden' }}>
            <Card style={styles.product}>
              <View style={styles.imageContainer}>
                <Image style={styles.image} source={{ uri: props.image }} />
              </View>
              <View style={styles.details}>
                <Text style={styles.title}>{props.title}</Text>
                <Text style={styles.price}>${props.price}</Text>
              </View>
              <View style={styles.action}>{props.children}</View>
            </Card>
          </View>
        </TouchableComponent>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    touchableContainer: {
      borderRadius: 10,
      overflow: 'hidden', // Required for ripple effect
    },
    product: {
      height: 300,
      margin: 20,
      borderRadius: 10,
      overflow: 'hidden', // Important for ripple effect
    },
    imageContainer: {
      width: '100%',
      height: '60%',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      overflow: 'hidden',
    },
    image: {
      width: '100%',
      height: '100%',
    },
    details: {
      alignItems: 'center',
      height: '15%',
    },
    title: {
      fontSize: 18,
      marginVertical: 4,
      fontFamily: 'open-sans-bold',
    },
    price: {
      fontSize: 14,
      color: '#888',
      fontFamily: 'open-sans-bold',
    },
    action: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '25%',
      paddingHorizontal: 20,
    },
  });
  