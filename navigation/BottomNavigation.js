import { Dimensions, StyleSheet, Image } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import PatternsScreen from "../screens/main/PatternsScreen";
import MainNavigation from './MainNavigation';
import MyPatternsNavigation from './MyPatternsNavigation';
import AccountScreen from "../screens/account/AccountScreen";
import ShopNavigation from './ShopNavigation';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { useFonts } from 'expo-font';

const { height } = Dimensions.get("screen");
const Tab = createBottomTabNavigator();


export default function BottomNavigation() {

  
const [fontsLoaded] = useFonts({
  NunitoMedium: require('../assets/fonts/Nunito-Medium.ttf'),
  NunitoSemiBold: require('../assets/fonts/Nunito-SemiBold.ttf'),
  NunitoBold: require('../assets/fonts/Nunito-Bold.ttf'),
})

  return (
    <Tab.Navigator 
    initialRouteName="Main"
    screenOptions={{
      tabBarActiveTintColor: '#FEE36E',
      tabBarInactiveTintColor: 'white',
      tabBarActiveBackgroundColor: '#6237A0',
      tabBarInactiveBackgroundColor: '#6237A0',
    }}>
      <Tab.Screen name="Main" component={MainNavigation} 
        options={{
          tabBarLabel: 'main', headerShown: false,
          tabBarIcon: ({size,focused,color}) => {
            return (<Image style={{ width: size, height: size }} source={require('../assets/images/nav_honey.png')} />);
          },}}/>
      <Tab.Screen name="Patterns" component={MyPatternsNavigation} 
        options={{
            tabBarLabel: 'patterns', headerTintColor: '#921bfa',
            headerTitle: 'My Patterns',
            headerTintColor: '#921bfa',
            headerTitleStyle: {
              fontFamily: 'NunitoBold',
              fontSize: RFValue(25, height),
            },
            headerStyle: {
              backgroundColor: '#FEE36E'
            },
            tabBarIcon: ({size,focused,color}) => {
            return (<Image style={{ width: size, height: size }} source={require('../assets/images/nav_honeycomb.png')} />);
            },}} />
      <Tab.Screen name="Shop" component={ShopNavigation} 
        options={{
            tabBarLabel: 'shop',headerTintColor: '#921bfa',
            headerTitle: 'My Shop',
            headerTintColor: '#921bfa',
            headerTitleStyle: {
              fontFamily: 'NunitoBold',
              fontSize: RFValue(25, height),
            },
            headerStyle: {
              backgroundColor: '#FEE36E'
            },
            tabBarIcon: ({size,focused,color}) => {
            return (<Image style={{ width: size, height: size }} source={require('../assets/images/nav_beehive.png')} />);
            },}} />
      <Tab.Screen name="Account" component={AccountScreen} 
        options={{
            tabBarLabel: 'account',headerTintColor: '#921bfa',
            headerTitle: 'Account',
            headerTintColor: '#921bfa',
            headerTitleStyle: {
              fontFamily: 'NunitoBold',
              fontSize: RFValue(25, height),
            },
            headerStyle: {
              backgroundColor: '#FEE36E'
            },
            tabBarIcon: ({size,focused,color}) => {
            return (<Image style={{ width: size, height: size }} source={require('../assets/images/bee.png')} />);
            },}} />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({})

/*
<Tab.Navigator 
    initialRouteName="Main"
    screenOptions={{
      tabBarActiveTintColor: '#FEE36E',
      tabBarInactiveTintColor: 'white',
      tabBarActiveBackgroundColor: '#6237A0',
      tabBarInactiveBackgroundColor: '#6237A0',
    }}>
      <Tab.Screen name="Main" component={MainNavigation} 
        options={{
          tabBarLabel: 'main',
          headerTitle: 'Purple Bee Main',
          headerTintColor: '#921bfa',
          headerTitleStyle: {
            fontFamily: 'NunitoBold',
            fontSize: RFValue(25, height),
          },
          headerStyle: {
            backgroundColor: '#FEE36E'
          },
          tabBarIcon: ({size,focused,color}) => {
            return (<Image style={{ width: size, height: size }} source={require('../assets/images/nav_honey.png')} />);
          },}}/>
      <Tab.Screen name="Patterns" component={MyPatternsNavigation} 
        options={{
            tabBarLabel: 'patterns', headerTintColor: '#921bfa',
            headerTitle: 'My Patterns',
            headerTintColor: '#921bfa',
            headerTitleStyle: {
              fontFamily: 'NunitoBold',
              fontSize: RFValue(25, height),
            },
            headerStyle: {
              backgroundColor: '#FEE36E'
            },
            tabBarIcon: ({size,focused,color}) => {
            return (<Image style={{ width: size, height: size }} source={require('../assets/images/nav_honeycomb.png')} />);
            },}} />
      <Tab.Screen name="Shop" component={ShopNavigation} 
        options={{
            tabBarLabel: 'shop',headerTintColor: '#921bfa',
            headerTitle: 'My Shop',
            headerTintColor: '#921bfa',
            headerTitleStyle: {
              fontFamily: 'NunitoBold',
              fontSize: RFValue(25, height),
            },
            headerStyle: {
              backgroundColor: '#FEE36E'
            },
            tabBarIcon: ({size,focused,color}) => {
            return (<Image style={{ width: size, height: size }} source={require('../assets/images/nav_beehive.png')} />);
            },}} />
      <Tab.Screen name="Account" component={AccountScreen} 
        options={{
            tabBarLabel: 'account',headerTintColor: '#921bfa',
            headerTitle: 'Account',
            headerTintColor: '#921bfa',
            headerTitleStyle: {
              fontFamily: 'NunitoBold',
              fontSize: RFValue(25, height),
            },
            headerStyle: {
              backgroundColor: '#FEE36E'
            },
            tabBarIcon: ({size,focused,color}) => {
            return (<Image style={{ width: size, height: size }} source={require('../assets/images/bee.png')} />);
            },}} />
    </Tab.Navigator>

    */
