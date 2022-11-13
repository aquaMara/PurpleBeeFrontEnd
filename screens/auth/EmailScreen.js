import React from 'react';
import { Dimensions, ScrollView, Image, ImageBackground, SafeAreaView, StyleSheet, Text, TextInput, View, Field, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
// import { MaterialCommunityIcons } from '@expo/vector-icons';
import { KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard  } from 'react-native';
import { useFonts } from 'expo-font';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { useContext } from "react";
import axios from '../../security/axios';
//import axios from 'axios';
import AuthContext from '../../security/AuthProvider';
import useAuth from '../../security/useAuth';

const { height } = Dimensions.get("screen");

export default function EmailScreen({ navigation }) {

  const [fontsLoaded] = useFonts({
    NunitoMedium: require('../../assets/fonts/Nunito-Medium.ttf'),
    NunitoBold: require('../../assets/fonts/Nunito-Bold.ttf'),
  })
    
  if (!fontsLoaded) {
    return null;
  }

  return (
    <ImageBackground source={require('../../assets/images/bigbees.jpg')} resizeMode='cover' style={{ flex: 1 }}>
      <View style={styles.inner}> 
        <View style={styles.box}> 
          <View style={styles.quoteBox}>
            <Text style={styles.title}>Welcome to Purple Bee</Text>
            <Text style={styles.quote}>To complete the registration, please follow the instruction that was sent to your email address</Text>
            <Text style={styles.ps}>P.S. Check inbox or spam, in case of errors contact support purplebee@gmail.com</Text>
          </View>
          <TouchableOpacity style={styles.button} 
            onPress={() => navigation.navigate('Login')}><Text style={styles.buttonText}>sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  inner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
  },
  box: {
    width: wp(90),
    height: hp(50),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(8, 0, 10, 0.9)',
  },
  quoteBox: {
    width: wp(80),
    marginBottom: hp(3),
  },
  quote: {
    color: '#921bfa',
    fontFamily: 'NunitoBold',
    fontSize: RFValue(23, height),
    textAlign: 'center',
    marginBottom: hp(2),
  },
  ps: {
    color: '#921bfa',
    fontFamily: 'NunitoMedium',
    fontSize: RFValue(23, height),
    textAlign: 'center',
  },
  title: {
    color: '#921bfa',
    fontFamily: 'NunitoBold',
    fontSize: RFValue(23, height),
    textAlign: 'center',
    textTransform: 'uppercase',
    marginBottom: hp(3),
  },
  button: {
    width: wp(40),
    height: hp(5),
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "yellow",
    justifyContent: "center",
    alignItems:"center",
    alignSelf: "center",
    backgroundColor: "black",
  },
  buttonText: {
    fontFamily: 'NunitoMedium',
    fontSize: RFValue(20, height),
    color: "#921bfa",
  },
})