import React from 'react'
import { Dimensions, ImageBackground, SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const { height } = Dimensions.get("screen");

export default function WelcomeScreen({ navigation }) {

  const [fontsLoaded] = useFonts({
    NunitoMedium: require('../../assets/fonts/Nunito-Medium.ttf'),
    NunitoBold: require('../../assets/fonts/Nunito-Bold.ttf'),
  })
    
  if (!fontsLoaded) {
    return null;
  }

  return (
    <ImageBackground source={require('../../assets/images/darkbees.jpg')} imageStyle={{
      resizeMode: "cover",
      alignSelf: "flex-end"
    }} style={{ flex: 1, bottom:0 }}>
      <SafeAreaView style={styles.inner}>
        <View style={styles.box}> 
          <View style={styles.quoteBox}>
            <Text style={styles.title}>Purple Bee</Text>
            <Text style={styles.quote}>Purple Bee это бесплатное сообщество для индивидуальных ремесленников и обладетелей небольшого бизнеса &lt;3</Text>
          </View>
          <TouchableOpacity style={styles.button} 
            onPress={() => navigation.navigate('Login')}><Text style={styles.buttonText}>вход</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} 
            onPress={() => navigation.navigate('Registration')}><Text style={styles.buttonText}>регистрация</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
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
  title: {
    color: '#921bfa',
    fontFamily: 'NunitoBold',
    fontSize: RFValue(23, height),
    textAlign: 'center',
    textTransform: 'uppercase',
    marginBottom: hp(1),
  },
  quote: {
    color: '#921bfa',
    fontFamily: 'NunitoBold',
    fontSize: RFValue(23, height),
    textAlign: 'center',
    lineHeight: hp(3.6)
  },
  button: {
    marginTop: hp(1),
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