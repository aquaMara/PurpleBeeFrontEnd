import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyPatternsScreen from '../screens/my-patterns/MyPatternsScreen';
import LivePatternScreen from '../screens/my-patterns/LivePatternScreen';

const Stack = createNativeStackNavigator();

export default function MyPatternsNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MyPatternsScreen" component={MyPatternsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="LivePatternScreen" component={LivePatternScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}