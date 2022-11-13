import { StyleSheet, Image } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PatternsScreen from "../screens/main/PatternsScreen";
import MyPatternsScreen from "../screens/main/MyPatternsScreen";
import MyPatternsShop from "../screens/my-shop/MyPatternsShop";
import AccountScreen from "../screens/account/AccountScreen";
import ShopNavigation from './ShopNavigation';

const Tab = createBottomTabNavigator();

export default function BottomNavigation() {
  return (
    <Tab.Navigator 
    initialRouteName="Main"
    screenOptions={{
      tabBarActiveTintColor: '#FEE36E',
      tabBarInactiveTintColor: 'white',
      tabBarActiveBackgroundColor: '#6237A0',
      tabBarInactiveBackgroundColor: '#9754CB',
      tabBarInactiveBackgroundColor: '#28104E',
      tabBarInactiveBackgroundColor: '#482673',
      tabBarInactiveBackgroundColor: '#6237A0',
      tabBarInactiveBackgroundColor: '#6237A0',
    }}>
      <Tab.Screen name="Main" component={PatternsScreen} 
        options={{
          tabBarLabel: 'main',
          tabBarIcon: ({size,focused,color}) => {
            return (<Image style={{ width: size, height: size }} source={require('../assets/images/nav_honey.png')} />);
          },}}/>
      <Tab.Screen name="Patterns" component={MyPatternsScreen} 
        options={{
            tabBarLabel: 'patterns',
            tabBarIcon: ({size,focused,color}) => {
            return (<Image style={{ width: size, height: size }} source={require('../assets/images/nav_honeycomb.png')} />);
            },}} />
      <Tab.Screen name="Shop" component={ShopNavigation} 
        options={{
            tabBarLabel: 'shop',
            tabBarIcon: ({size,focused,color}) => {
            return (<Image style={{ width: size, height: size }} source={require('../assets/images/nav_beehive.png')} />);
            },}} />
      <Tab.Screen name="Account" component={AccountScreen} 
        options={{
            tabBarLabel: 'account',
            tabBarIcon: ({size,focused,color}) => {
            return (<Image style={{ width: size, height: size }} source={require('../assets/images/bee.png')} />);
            },}} />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({})

/*
<Tab.Screen name="Shop" component={MyPatternsShop} 
        options={{
            tabBarLabel: 'shop',
            tabBarIcon: ({size,focused,color}) => {
            return (<Image style={{ width: size, height: size }} source={require('../assets/images/nav_beehive.png')} />);
            },}} />
            */

/*
title: 'My home',
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          */