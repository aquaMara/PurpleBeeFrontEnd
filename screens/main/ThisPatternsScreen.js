import { Dimensions, StyleSheet, Text, View, Image, SafeAreaView, ScrollView, TouchableOpacity, TextInput, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { ImageBackground  } from 'react-native';
import { useFonts } from 'expo-font';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFValue } from "react-native-responsive-fontsize";
import useAuth from '../../security/useAuth';
import useAxiosPrivate from '../../security/useAxiosPrivate';
import { Rating } from 'react-native-ratings';

const { height } = Dimensions.get("screen");

export default function ThisPatternsScreen({ navigation, route }) {

  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const [pattern, setPattern] = useState({});
  const [payment, setPayment] = useState({});
  const [comments, setComments] = useState([]);
  const [buttonEnabled, setButtonEnabled] = useState(false);

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

  const checkIfAcquired = () => {
    const response = axiosPrivate.get(`/payment/check/${route.params.id}`)
    .then((res) => {
      
      console.log("checkIfAcquired", res.data);
      setButtonEnabled(res.data);
    })
    .catch( (e) => { console.log("Pattern error ", e) } );
  }

  useEffect(() => {
    checkIfAcquired();
    getPatterns();
    getComments();
  }, []);

  const acquirePattern = () => {
    setPayment({payment: pattern.price, username: auth.username, patternId: pattern.id});
    setPayment({payment: pattern.price, username: auth.username, patternId: pattern.id});
    console.log(payment)

    const response = axiosPrivate.post(`/payment/`, payment)
    .then((res) => {
      console.log("Payment", res.data)
      checkIfAcquired();  // ghhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhf
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
          <Image source={{uri: `http://92.51.39.80:8080/pattern/image/${pattern.id}`}} style={{width: wp(90), height: wp(90)}} resizeMode='cover' />
          <Text style={styles.title}>{pattern.name}</Text>
          <Text style={styles.text}>Паттерн от: {pattern.creatorUsername}</Text>
          <Rating type='heart' ratingCount={5} imageSize={30} startingValue={pattern.avgRate}
                readonly='true' style={{ alignSelf: 'center'}} />
          <Text style={styles.text}>Ремесло: {pattern.craftName}</Text>
          <Text style={styles.text}>Категория: {pattern.categoryName}</Text>
          <Text style={styles.text}>Сложность: {pattern.difficultyLevel}</Text>
          <Text style={styles.text}>Язык: {pattern.languageName}</Text>
          <Text style={styles.text}>Стоимость: {pattern.price} {pattern.currencyName}</Text>
          <Text style={styles.text}>{pattern.littleDescription}</Text>
          <TouchableOpacity style={[styles.button, buttonEnabled && {backgroundColor: 'rgba(255, 255, 0, 0.4)'}]} onPress={acquirePattern} disabled={buttonEnabled}>
            <Text style={[styles.text, buttonEnabled && {color: 'rgba(146, 27, 250, 0.4)'}]}>Приобрести за {pattern.price} {pattern.currencyName}</Text>
          </TouchableOpacity>
        </View>
        )}
        {
          comments &&
          (
            <View>
            <Text style={[styles.title, {marginTop: hp(3), marginBottom: hp(2)}]}>***Комментарии***</Text>
            {comments.map((item, index) => {
              return (
                <View key={index} style={styles.comment}>
                  <Text style={[styles.text, {alignSelf: 'center', marginLeft: wp(0)}]}>{item.body}</Text>
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
    alignSelf: 'flex-start',
    marginLeft: wp(10)
  },
  comment: {
    borderWidth: 2,
    borderColor: 'yellow',
    marginBottom: hp(1),
    padding: 10,
  }
})