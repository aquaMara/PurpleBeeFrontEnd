import { Dimensions, StyleSheet, Text, View, Image, SafeAreaView, ScrollView, TouchableOpacity, TextInput, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import SelectList from 'react-native-dropdown-select-list';
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
import { Rating } from 'react-native-ratings';

const { height } = Dimensions.get("screen");

export default function ThisPatternsScreen({ navigation, route }) {

  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const [pattern, setPattern] = useState({});
  const [payment, setPayment] = useState({});
  const [comments, setComments] = useState([]);

  const getPatterns = () => {
    const response = axiosPrivate.get(`/pattern/${route.params.id}`)
    .then((res) => {
      console.log("Pattern", res.data)
      setPattern(res.data);
      setPayment({payment: res.data.price, username: auth.username, patternId: res.data.id});
      console.log("Payment", payment);
    })
    .catch( (e) => { console.log("Pattern error ", e) } );
  }

  const getComments = () => {
    const response = axiosPrivate.get(`/comment/${route.params.id}`)
    .then(res => setComments(res.data))
    .catch( (e) => { console.log("getComments error ", e) } );
  }

  useEffect(() => {
    getPatterns();
    getComments();
    console.log('ccc', comments)

  }, []);

  const acquirePattern = () => {
    setPayment({payment: pattern.price, username: auth.username, patternId: pattern.id});
    setPayment({payment: pattern.price, username: auth.username, patternId: pattern.id});
    console.log(payment)

    const response = axiosPrivate.post(`/payment/`, payment)
    .then((res) => {
      console.log("Payment", res.data)
      alert("Pattern is now yours!")
    })
    .catch( (e) => { console.log("Payment error ", e); alert("Payment error") } );
    
  }

  const [fontsLoaded] = useFonts({
    NunitoMedium: require('../../assets/fonts/Nunito-Medium.ttf'),
    NunitoSemiBold: require('../../assets/fonts/Nunito-SemiBold.ttf'),
    NunitoBold: require('../../assets/fonts/Nunito-Bold.ttf'),
  })

  if (!fontsLoaded) {
    return null;
  }
  
  return (
    <ImageBackground source={require('../../assets/images/bigbees.jpg')} resizeMode='cover'  style={{ flex: 1 }}>
      <ScrollView style={{flex: 1, backgroundColor: 'rgba(255,255,255,0.9)'}}>
      <SafeAreaView >
      {
        pattern === 0 || payment === 0 ? ( <Text>noooooooooooooooooooo</Text> ) 
        : (
        <View style={styles.inner}>
          <Image source={require('../../assets/images/kitty.jpg')} style={{width: wp(90), height: wp(90)}} resizeMode='cover' />
          <Text style={styles.title}>{pattern.name}</Text>
          <Text style={styles.text}>Creator: {pattern.creatorUsername}</Text>
          <Rating type='heart' ratingCount={5} imageSize={30} startingValue={pattern.avgRate}
                readonly='true' style={{ alignSelf: 'center'}} />
          <Text style={styles.text}>Craft: {pattern.craftName}</Text>
          <Text style={styles.text}>Category: {pattern.categoryName}</Text>
          <Text style={styles.text}>Difficulty: {pattern.difficultyLevel}</Text>
          <Text style={styles.text}>Language: {pattern.languageName}</Text>
          <Text style={styles.text}>Price: {pattern.price} {pattern.currencyName}</Text>
          <Text style={styles.text}>{pattern.littleDescription}</Text>
          <TouchableOpacity style={styles.button} onPress={acquirePattern}>
            <Text style={styles.text}>Get Pattern for {pattern.price} {pattern.currencyName}</Text>
          </TouchableOpacity>
        </View>
        )}
        {
          comments &&
          (
            <View>
            <Text style={[styles.title, {marginTop: hp(3), marginBottom: hp(2)}]}>***Comments Section***</Text>
            {comments.map((item, index) => {
              return (
                <View key={index} style={styles.comment}>
                  <Text style={styles.text}>{item.body}</Text>
                </View>
              );
            })}
        </View>
          )
        }
      </SafeAreaView>
        </ScrollView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  inner: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    marginTop: hp(3),
    width: wp(80),
    height: hp(5),
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "yellow",
    justifyContent: "center",
    alignItems:"center",
    alignSelf: "center",
    backgroundColor: "yellow",
  },
  buttonText: {
    fontFamily: 'NunitoMedium',
    fontSize: RFValue(20, height),
    color: "#921bfa",
  },
  scrollingContainer: {
    height: hp(40),
  },
  title: {
    fontFamily: 'NunitoBold',
    fontSize: RFValue(25, height),
    color: "#921bfa",
    alignSelf: 'center',
  },
  text: {
    fontFamily: 'NunitoBold',
    fontSize: RFValue(23, height),
    color: "#921bfa",
    alignSelf: 'center',
  },
  comment: {
    borderWidth: 2,
    borderColor: 'yellow',
    marginBottom: hp(1),
    padding: 10,
  }
})