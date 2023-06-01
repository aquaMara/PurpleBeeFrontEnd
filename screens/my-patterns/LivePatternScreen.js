import { Dimensions, StyleSheet, Text, View, Image, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, ImageBackground  } from 'react-native';
import { useFonts } from 'expo-font';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFValue } from "react-native-responsive-fontsize";
import useAuth from '../../security/useAuth';
import useAxiosPrivate from '../../security/useAxiosPrivate';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Rating } from 'react-native-ratings';



const { height } = Dimensions.get("screen");

export default function LivePatternScreen({ navigation, route }) {

  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const [pattern, setPattern] = useState({});
  const [livePattern, setLivePattern] = useState([]);
  const [comment, setComment] = useState('');

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

  const addComment = () => {
    console.log(comment);
    const n = {body: comment, patternId: pattern.id, id: null};
    console.log(n)
    const response = axiosPrivate.post(`/comment/${pattern.id}`, n)
    .then((res) => {
      console.log("addComment ", res.data);
      Alert.alert("Ваш комментарий отправлен!");
      setComment('');
    })
    .catch( (e) => { console.log("addComment error ", e) } );

  }

  const ratingCompleted = (rating) => {
    console.log("Rating is: " + rating)
    const response = axiosPrivate.get(`/rate/${pattern.id}/value/${rating}`)
    .then((res) => {
      console.log("Update ratingCompleted ", res.data);
    })
    .catch( (e) => { console.log("Update ratingCompleted error ", e) } );
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
      { pattern === 0 || livePattern.length === 0 ? ( <Text></Text> ) : (
      <ScrollView>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.inner}>
          <View>
            <View style={{alignItems: 'center'}}>
              <Image source={{uri: `http://92.51.39.80:8080/pattern/image/${pattern.id}`}} style={{width: wp(90), height: wp(90)}} resizeMode='cover' />
            </View>
            <Text style={styles.title}>{pattern.name}</Text>
            <Rating type='star' ratingColor='#921bfa' selectedColor='#921bfa' ratingBackgroundColor='red'
              ratingCount={5} imageSize={30} startingValue={pattern.avgRate}
              ratingImage={require('../../assets/images/hive.png')}
              style={{ alignSelf: 'center'}}
              onFinishRating={ratingCompleted} />
            <Text style={styles.text}>Паттерн от: {pattern.creatorUsername}</Text>
            <Text style={styles.text}>Ремесло: {pattern.craftName}</Text>
            <Text style={styles.text}>Категория: {pattern.categoryName}</Text>
            <Text style={styles.text}>Сложность: {pattern.difficultyLevel}</Text>
            <Text style={styles.text}>Язык: {pattern.languageName}</Text>
            <Text style={styles.text}>{pattern.littleDescription}</Text>
          </View>
          <Text style={[styles.section]}>***Живой паттерн***</Text>
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
          <Text style={[styles.section]}>***Оставьте комментарий***</Text>
          <View>
            <TextInput style={styles.inputArea}
              multiline numberOfLines={4}
              placeholder="Введите Ваш комментарий..." placeholderTextColor={"gray"}
              value={comment} onChangeText={c => setComment(c)} />
              <TouchableOpacity onPress={addComment} style={styles.button}>
                <Text style={styles.buttonText}>отправить комментарий</Text>
              </TouchableOpacity>
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
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
  },
  button: {
    marginTop: hp(0),
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
  section: {
    marginTop: hp(3),
    marginBottom: hp(1),
    width: wp(100),
    fontFamily: 'NunitoBold',
    fontSize: RFValue(20, height),
    color: "#921bfa",
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  text: {
    fontFamily: 'NunitoBold',
    fontSize: RFValue(23, height),
    color: "#921bfa",
  },
  inputArea: {
    borderWidth: 2,
    color: '#921bfa',
    borderRadius: 10,
    padding: 10,
    width: wp(78),
    fontFamily: 'NunitoMedium',
    fontSize: RFValue(16, height),
    backgroundColor: "white",
    borderColor: "yellow",
    marginTop: hp(3),
    textAlignVertical: 'top'
  },
})