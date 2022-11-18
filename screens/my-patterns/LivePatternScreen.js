import { Dimensions, StyleSheet, Text, View, Image, SafeAreaView, ScrollView, TouchableOpacity, TextInput } from 'react-native'
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
import BouncyCheckbox from "react-native-bouncy-checkbox";


const { height } = Dimensions.get("screen");

export default function ThisPatternsScreen({ navigation, route }) {

  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const [pattern, setPattern] = useState({});
  const [livePattern, setLivePattern] = useState([]);

  useEffect(() => {
    getPattern();
    getLivePattern();
  }, []);

  const getPattern = () => {
    const response = axiosPrivate.get(`/pattern/${route.params.id}`)
    .then((res) => {
      console.log("Pattern", res.data)
      setPattern(res.data);
    })
    .catch( (e) => { console.log("Pattern error ", e) } );
  }

  const getLivePattern = () => {
    const response = axiosPrivate.get(`/live-row/${route.params.id}/user/${auth.username}`)
    .then((res) => {
      console.log("Live Pattern", res.data)
      setLivePattern(res.data);
    })
    .catch( (e) => { console.log("Live Pattern error ", e) } );
  }

  const updateLiveRow = (liveRowId) => {
    console.log("liveRowId ", liveRowId);
    const response = axiosPrivate.put(`/live-row/${liveRowId}/user/${auth.username}`)
    .then((res) => {
      console.log("Update Live Row ", res.data);
    })
    .catch( (e) => { console.log("Update Live Row error ", e) } );
  }

  const handleOnPress = (val, key) => {
    console.log(val, "key ", key);
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
      { pattern === 0 || livePattern.length === 0 ? ( <Text>noooooooooooooooooooo</Text> ) : (
      <ScrollView>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.inner}>
          <View>
            <Image source={require('../../assets/images/kitty.jpg')} style={{width: wp(90), height: wp(90)}} resizeMode='cover' />
            <Text style={styles.title}>{pattern.name}</Text>
            <Text style={styles.text}>Creator: {pattern.creatorUsername}</Text>
            <Text style={styles.text}>Craft: {pattern.craftName}</Text>
            <Text style={styles.text}>Category: {pattern.categoryName}</Text>
            <Text style={styles.text}>Difficulty: {pattern.difficultyLevel}</Text>
            <Text style={styles.text}>Language: {pattern.languageName}</Text>
            <Text style={styles.text}>Price: {pattern.price} {pattern.currencyName}</Text>
            <Text style={styles.text}>{pattern.littleDescription}</Text>
          </View>
          <View>
          {livePattern.map((liveRow, key)=>(
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Text key={key} style={styles.text}>{liveRow.rowNumber}</Text>
              <BouncyCheckbox key={liveRow.liveRowId}
              size={wp(8)}
              fillColor={liveRow.isInfo ? '#921bfa' : '#921bfa'}
              unfillColor={liveRow.isInfo ? 'yellow' : 'yellow'}
              isChecked={liveRow.isCrossed}
              text={liveRow.schema}
              iconStyle={{ borderColor: "yellow" }}
              innerIconStyle={{ borderColor: "yellow" }}
              textStyle={liveRow.isTitleRow ? styles.title : styles.text}
              onPress={() => updateLiveRow(liveRow.liveRowId)}
            />
            </View>))}
          </View>
      </View>
      </TouchableWithoutFeedback>
      </SafeAreaView>
      </KeyboardAvoidingView>
      </ScrollView>
        )}
    </ImageBackground>
  )
}

/*

            {livePattern.map((liveRow, key)=>(
            <View>
              <Text key={key}>{liveRow.rowNumber}</Text>
            </View>))}
            */

const styles = StyleSheet.create({
  inner: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.8)',
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
  title: {
    fontFamily: 'NunitoBold',
    fontSize: RFValue(25, height),
    color: "#921bfa",
    alignSelf: 'center',
    textTransform: 'uppercase'
  },
  text: {
    fontFamily: 'NunitoBold',
    fontSize: RFValue(23, height),
    color: "#921bfa",
  },
})