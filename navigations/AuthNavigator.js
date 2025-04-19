import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AuthScreen from '../screens/user/AuthScreen';

const Stack = createStackNavigator();

const AuthNavigator = ({ setIsAuthenticated }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login">
        {(props) => (
          <AuthScreen {...props} route={{ ...props.route, params: { setIsAuthenticated } }} />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default AuthNavigator;
