import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Button } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import { useDispatch } from 'react-redux'


import Input from '../../components/UI/Input'
import Card from '../../components/UI/Card'
import Colors from '../../constants/Colors'
import * as authActions from '../../store/actions/auth'

export default function AuthScreen() {

  const navigation = useNavigation();
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Auth"
    })
  }, [navigation])

  const signupHandler = () => {
      dispatch(authActions)
  }

  return (
    <KeyboardAvoidingView
      behavior='padding'
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
      <Card style={styles.authContainer}>
        <ScrollView>
          <Input
            id="email"
            label="E-mail"
            keynoardType="email-address"
            required
            email
            autoCapitalize="none"
            errorMessage="Please Enter a vaild email address"
            onInputChange={() => {}}
            initialValue=""
          />
          <Input
            id="password"
            label="Password"
            keynoardType="default"
            secureTextEntry
            required
            minLength={5}
            autoCapitalize="none"
            errorMessage="Please Enter a vaild password"
            onInputChange={() => {}}
            initialValue=""
          />
          <View style={styles.buttonContainer}>
          <Button 
          title="login"
          color={Colors.primary}
          onPress={() => {}}
          />
          </View>
          <View style={styles.buttonContainer}>
          <Button 
          title='Sign Up'
          color={Colors.accent}
          onPress={() => {}}
          />
          </View>
        </ScrollView>
      </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  gradient: { 
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
  },
  buttonContainer: {
    marginTop: 10,
  },
}) 