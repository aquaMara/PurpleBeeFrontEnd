import { Dimensions, StyleSheet, Text, View, TouchableOpacity, TextInput, Picker } from 'react-native'
import React, { useState } from 'react'
import { KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard  } from 'react-native';
import { useFonts } from 'expo-font';
import SelectDropdown from 'react-native-select-dropdown';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import SelectList from 'react-native-dropdown-select-list'

const { height } = Dimensions.get("screen");


export default function AccountScreen({ navigation }) {

  const [user, setUser] = useState({
    username: "marainexplorer",
    email: "aquamarina.na@gmail.com",
    instagram: "marainexplorer",
    registrationDate: "16.10.2022",
  });

  const countries = ["Egypt", "Canada", "Australia", "Ireland"];
  const [language, setLanguage] = React.useState("");
  const [currency, setCurrency] = React.useState("");
  const [country, setCountry] = React.useState("");
  
  const data = [
    {key:'1',value:'English'},
    {key:'2',value:'Spanish'},
    {key:'3',value:'Russian'},
  ];


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
// https://www.npmjs.com/package/react-native-dropdown-select-list

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : ""} style={styles.container} >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <View style={styles.common}>
            <Text style={styles.title}>Username</Text>
            <Text style={styles.body}>{user.username}</Text>
          </View>
          <View style={styles.common}>
            <Text style={styles.title}>Email</Text>
            <TouchableOpacity style={{borderStyle: "solid"}} onPress={() => navigation.navigate('ChangeEmail')}>
              <Text style={styles.body}>{user.email}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.common}>
            <Text style={styles.title}>Instagram</Text>
            <Text style={styles.body}>{user.instagram}</Text>
          </View>
          <View style={styles.common}>
            <Text style={styles.title}>since</Text>
            <Text style={styles.body}>{user.registrationDate}</Text>
          </View>
          <View><Text>App settings</Text></View>
          <SelectList 
            boxStyles={styles.select}
            inputStyles={styles.dropdownText}
            dropdownStyles={styles.select}
            dropdownTextStyles={styles.dropdownText}
            searchPlaceholder="language"
            setSelected={setLanguage} 
            data={data} 
            onSelect={() => alert(language)} />
          <SelectList 
            boxStyles={styles.select}
            inputStyles={styles.dropdownText}
            dropdownStyles={styles.select}
            dropdownTextStyles={styles.dropdownText}
            searchPlaceholder="country"
            setSelected={setCountry} 
            data={data} 
            onSelect={() => alert(country)} />
          <SelectList 
            boxStyles={styles.select}
            inputStyles={styles.dropdownText}
            dropdownStyles={styles.select}
            dropdownTextStyles={styles.dropdownText}
            searchPlaceholder="currency"
            setSelected={setCurrency} 
            data={data} 
            onSelect={() => alert(currency)} />

        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    //alignItems: "center",
    backgroundColor: "white",
  },
  common: {
    display: 'flex',
    flexDirection: 'row',
    //borderWidth: 1,
  },
  title:{
    color: "#6237A0",
    fontFamily: 'NunitoSemiBold',
    fontSize: RFValue(20, height),
    marginLeft: wp(5),
    marginTop: hp(1),
    //borderWidth: 1
  },
  body: {
    color: "#6237A0",
    fontFamily: 'NunitoBold',
    fontSize: RFValue(20, height),
    marginLeft: wp(5),
    marginTop: hp(1),
    borderBottomWidth: 1,
  },
  select: {
    width: wp(60),
    borderWidth: 2,
    borderColor: "#FEE36E",
    marginLeft: wp(5),
    marginTop: hp(1),
  },
  dropdownText: {
    color: "#6237A0",
    fontFamily: 'NunitoSemiBold',
    fontSize: RFValue(20, height),
  }

})