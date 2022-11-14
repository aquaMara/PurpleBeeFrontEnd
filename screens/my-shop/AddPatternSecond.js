import { Dimensions, StyleSheet, Text, View, Image, Button, SafeAreaView, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect } from 'react'
import SelectList from 'react-native-dropdown-select-list';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, ImageBackground  } from 'react-native';
//import CheckBox from '@react-native-community/checkbox';
import CheckBox from 'expo-checkbox';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import RNBounceable from "react-native-bouncy-checkbox";
import { useFonts } from 'expo-font';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const { height } = Dimensions.get("screen");

export default function AddPatternSecond() {

  const [inputs, setInputs] = useState([ {key: '', value: '', isInfo: false, isTitle: false} ]);
  const [checkboxState, setCheckboxState] = useState(false)
  const [toggleCheckBox, setToggleCheckBox] = useState(false)
    
  const addHandler = ()=>{
    const currentInputs = [...inputs];
    currentInputs.push({key: '', value: '', isInfo: false, isTitle: false});
    setInputs(currentInputs);
    console.log("currentInputs ", currentInputs)
    console.log("i ", inputs)
  }
  
  const deleteHandler = (key)=>{
    const currentInputs = inputs.filter((input, index) => index != key);
    setInputs(currentInputs);
  }

  const inputHandler = (text, key)=>{
    const currentInputs = [...inputs];
    currentInputs[key].value = text;
    currentInputs[key].key   = key;
    setInputs(currentInputs);    
  }

  const titleHandler = (choice, key)=>{
    const currentInputs = [...inputs];
    currentInputs[key].isTitle = choice;
    currentInputs[key].key   = key;
    setInputs(currentInputs);    
  }

  const infoHandler = (choice, key)=>{
    const currentInputs = [...inputs];
    currentInputs[key].isInfo = choice;
    currentInputs[key].key   = key;
    setInputs(currentInputs);    
  }

  const send = () => {
    console.log("inputs", inputs);
  }

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
  
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'gold' }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            {inputs.map((input, key)=>(
            <View styles={{ flex:1 }}>
              <View style={styles.together}>
                <Text style={styles.text}>{key}</Text>
                <TextInput style={styles.schemaInput} key={inputs.key}
                  onChangeText={(text)=>inputHandler(text, key)}
                  value={input.value}
                  placeholder="schema" placeholderTextColor={"gray"} />
                <TouchableOpacity onPress = {()=> deleteHandler(key)} style={styles.deleteButton}>
                  <Text style={styles.buttonText}>X</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.together}>
                <View style={styles.checkboxes}>
                  <CheckBox style={styles.checkbox} key={inputs.key}
                    disabled={false}
                    value={input.isTitle}
                    onValueChange={(newValue) => titleHandler(newValue, key)} />
                  <Text style={styles.text}>Tick if Title</Text>
                </View>
                <View style={styles.checkboxes}>
                  <CheckBox style={styles.checkbox} key={inputs.key}
                    disabled={false}
                    value={input.isInfo}
                    onValueChange={(newValue) => infoHandler(newValue, key)} />
                  <Text style={styles.text}>Tick if Info</Text>
                </View>
              </View>
              
            </View>))}
            <TouchableOpacity onPress = {addHandler} style={styles.button}>
              <Text style={styles.buttonText}>add</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress = {send} style={styles.button}>
              <Text style={styles.buttonText}>send</Text>
            </TouchableOpacity>



          </View>
          </TouchableWithoutFeedback>
      </SafeAreaView>
    </KeyboardAvoidingView>
    )
  }

  
const styles = StyleSheet.create({
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
  text: {
    fontFamily: 'NunitoMedium',
    fontSize: RFValue(20, height),
    color: "#921bfa",
  },
  schemaInput: {
    borderWidth: 2,
    color: '#921bfa',
    borderRadius: 10,
    padding: 6,
    width: wp(78),
    backgroundColor: "white",
    borderColor: "#921bfa",
    flexDirection:'row',
    fontFamily: 'NunitoMedium',
    fontSize: RFValue(16, height),
    marginLeft: wp(1),
  },
  checkbox: {
    borderWidth: 2,
    borderColor: "#921bfa",
    borderRadius: 10,
    padding: 16,
  },
  together: {
    backgroundColor: 'green',
    width: wp(100),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: "red",
  },
  checkboxes: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: wp(45),
    borderWidth: 2,
    borderColor: "#921bfa",
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
    marginTop: hp(1),
    textAlignVertical: 'top'
  },
  deleteButton: {
    width: wp(10),
    height: hp(6),
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#921bfa",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems:"center",
    alignSelf: "center",
    marginLeft: wp(1),
  },
});
  
/*
{inputs.map((input, key)=>(
        <View styles={{flex:1}}>
          <View styles={{backgroundColor: 'blue', width: 100, height: 400}}><Text>yyyu</Text></View>
          <TextInput style={styles.input} key={inputs.key}
            onChangeText={(text)=>inputHandler(text, key)}
            value={input.value}
            placeholder="schema" placeholderTextColor={"gray"} />
          <View style={styles.together}>
            <CheckBox style={styles.checkbox} key={inputs.key}
              disabled={false}
              value={input.isTitle}
              onValueChange={(newValue) => titleHandler(newValue, key)} />
            <Text style={styles.text}>Title?</Text>
          </View>
          <View style={styles.together}>
            <CheckBox style={styles.checkbox} key={inputs.key}
              disabled={false}
              value={input.isInfo}
              onValueChange={(newValue) => infoHandler(newValue, key)} />
            <Text style={styles.text}>Info?</Text>
          </View>
          <TouchableOpacity onPress = {()=> deleteHandler(key)} style={styles.button}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity> 
        </View>))}
        <Button title="Add" onPress={addHandler} />
        <Button title="Send" onPress={send} />
*/
  /*

          <BouncyCheckbox
            size={25}
            fillColor="red"
            unfillColor="#FFFFFF"
            text="Custom Checkbox"
            iconStyle={{ borderColor: "red" }}
            innerIconStyle={{ borderWidth: 2 }}
            onPress={() => setCheckboxState(!checkboxState)}
          />
          <RNBounceable
            style={{
              marginTop: 16,
              height: 50,
              width: "90%",
              backgroundColor: "#ffc484",
              borderRadius: 12,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => setCheckboxState(!checkboxState)}
          >
            <Text style={{ color: "#fff" }}>Synthetic Checkbox Press</Text>
          </RNBounceable>
  */