import { Dimensions, StyleSheet, Text, View, Image, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Button } from 'react-native'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, ImageBackground  } from 'react-native';
import { useFonts } from 'expo-font';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
//import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
// import ImagePicker from 'react-native-image-crop-picker';
import * as ImagePicker from 'expo-image-picker';
import useAuth from '../../security/useAuth';
import useAxiosPrivate from '../../security/useAxiosPrivate';
import { Formik } from 'formik';
import * as FileSystem from 'expo-file-system';
import { FileSystemUploadType } from 'expo-file-system';
import CheckBox from 'expo-checkbox';
import { FlatList } from 'react-native';
// import { FlatList } from 'react-native-gesture-handler';

const { height } = Dimensions.get("screen");

export default function MyPatternsScreen({ navigation }) {

  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();

  const [patterns, setPatterns] = useState([]);

  const getPatterns = async () => {
    const response = await axiosPrivate.get(`/payment/${auth.username}`)
    .then((res) => {
      console.log("PATTERNS", res.data)
      setPatterns(res.data);      
    })
    .catch( (e) => { console.log("Patterns error ", e) } );
  }

  useEffect(() => {
    getPatterns();
  }, []);

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
  if (!patterns) {
    return null
  }


  return (
    <ImageBackground source={require('../../assets/images/bigbees.jpg')} resizeMode='cover'  style={{ flex: 1 }}>
      {
        patterns.length === 0 ? ( <Text style={styles.hello}>You don't have patterns yet</Text> ) 
        : (
        <ScrollView style={styles.inner} nestedScrollEnabled={true} horizontal={false}>
          <View style={styles.helloBox}>
            <Text style={styles.hello}>Hello {auth.username}! Enjoy your patterns!</Text>
          </View>
        <ScrollView style={styles.inner} nestedScrollEnabled={true} horizontal={true}>
          <FlatList keyExtractor={(item) => item.id} data={patterns} numColumns={2} 
            style={{ flex: 1}}
            nestedScrollEnabled={true}
            columnWrapperStyle={{display: 'flex', justifyContent: 'space-between'}}
            renderItem={ ({item}) => (
              <View style={{borderWidth: 1, borderColor: 'yellow', width: wp(50), justifyContent: 'center', alignItems: 'center'}}>
                <Image source={require('../../assets/images/kitty.jpg')} style={styles.image} resizeMode='cover' />
                <TouchableOpacity onPress={() => { navigation.navigate('LivePatternScreen', {id: item.id}) }}>
                  <Text style={styles.text}>{item.name}</Text>
                </TouchableOpacity>
              </View>
            )} />
        </ScrollView>
        </ScrollView>
        )}
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  inner: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
  image: {
    width: wp(46),
    height: wp(46),
  },
  helloBox: {
    backgroundColor: 'white',
    width: wp(100),
    height: hp(5),
  },
  hello: {
    fontFamily: 'NunitoBold',
    fontSize: RFValue(23, height),
    color: "#921bfa",
    alignSelf: 'center',
    marginTop: hp(1),
  },
  text: {
    fontFamily: 'NunitoMedium',
    fontSize: RFValue(20, height),
    color: "#921bfa",
    alignSelf: 'center'
  },
})