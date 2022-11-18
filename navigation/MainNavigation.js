import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PatternsScreen from '../screens/main/PatternsScreen';
import ThisPatternsScreen from '../screens/main/ThisPatternsScreen';

const Stack = createNativeStackNavigator();

export default function MainNavigation() {
  return (
    <Stack.Navigator>
        <Stack.Screen name="PatternsScreen" component={PatternsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ThisPatternsScreen" component={ThisPatternsScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}