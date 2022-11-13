import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddPatternFirst from "../screens/my-shop/AddPatternFirst";
import MyPatternsShop from '../screens/my-shop/MyPatternsShop';

const Stack = createNativeStackNavigator();

export default function ShopNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MyShop" component={MyPatternsShop} />
        <Stack.Screen name="AddPatternFirst" component={AddPatternFirst} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}