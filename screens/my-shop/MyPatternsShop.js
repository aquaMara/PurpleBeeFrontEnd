import { Dimensions, ImageBackground, StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import { KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard  } from 'react-native';
import { useFonts } from 'expo-font';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const { height } = Dimensions.get("screen");

export default function MyPatternsShop({ navigation }) {

  const [fontsLoaded] = useFonts({
    NunitoLight: require('../../assets/fonts/Nunito-Light.ttf'),
    NunitoRegular: require('../../assets/fonts/Nunito-Regular.ttf'),
    NunitoMedium: require('../../assets/fonts/Nunito-Medium.ttf'),
    NunitoSemiBold: require('../../assets/fonts/Nunito-SemiBold.ttf'),
    NunitoBold: require('../../assets/fonts/Nunito-Bold.ttf'),
    NunitoExtraBold: require('../../assets/fonts/Nunito-ExtraBold.ttf'),
  })

  if (!fontsLoaded) {
    return null;
  }
  
  return (
    <ImageBackground source={require('../../assets/images/bigbees.jpg')} resizeMode='cover'  style={{ flex: 1 }}>
    <ScrollView style={{backgroundColor: 'rgba(255,255,255,0.8)'}}>
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : ""} style={styles.container} >
    <SafeAreaView style={{ flex: 1 }}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.inner}>
          <Text style={styles.title}>Hey, Honey!</Text>
          <Text style={styles.text}>It is your personal shop where you can add patterns with Live Pattern function.
            The process of pattern creation consists of adding rows corresponding to your pattern schema.
            Affter you created Live Pattern, the user can cross done rows.</Text>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddPatternFirst')}>
            <Text style={styles.buttonText}>add pattern</Text>
          </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
    </SafeAreaView>
    </KeyboardAvoidingView>
    </ScrollView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  inner: {
    flex: 1,
    backgroundColor: 'rgba(255,255,0,0.0)',
    alignItems: 'center',
  },
  button: {
    marginTop: hp(1),
    width: wp(40),
    height: hp(5),
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#921bfa",
    justifyContent: "center",
    alignItems:"center",
    alignSelf: "center",
    backgroundColor: "white",
  },
  buttonText: {
    fontFamily: 'NunitoMedium',
    fontSize: RFValue(20, height),
    color: "#921bfa",
  },
  title: {
    marginTop: hp(1),
    fontFamily: 'NunitoBold',
    fontSize: RFValue(25, height),
    color: "#921bfa",
    alignSelf: 'center',
    textTransform: 'uppercase'
  },
  text: {
    fontFamily: 'NunitoBold',
    fontSize: RFValue(23, height),
    textAlign: 'center',
    color: "#921bfa",
  },
})