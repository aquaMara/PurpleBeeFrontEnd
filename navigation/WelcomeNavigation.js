import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/auth/WelcomeScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegistrationScreen from '../screens/auth/RegistrationScreen';
import EmailScreen from '../screens/auth/EmailScreen';
import BottomNavigation from './BottomNavigation';

const Stack = createNativeStackNavigator();

export default function WelcomeNavigation() {
  return (
      <Stack.Navigator initialRouteName='Welcome'>
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Registration" component={RegistrationScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Email" component={EmailScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Root" component={BottomNavigation} options={{ headerShown: false }} />
      </Stack.Navigator>
  )
}