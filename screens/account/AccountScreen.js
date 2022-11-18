import { ImageBackground, ScrollView, SafeAreaView, Dimensions, StyleSheet, Text, View, TouchableOpacity, TextInput, Picker } from 'react-native'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard  } from 'react-native';
import { useFonts } from 'expo-font';
import SelectDropdown from 'react-native-select-dropdown';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import SelectList from 'react-native-dropdown-select-list'
import useAuth from '../../security/useAuth';
import useAxiosPrivate from '../../security/useAxiosPrivate';

const { height } = Dimensions.get("screen");


export default function AccountScreen({ navigation }) {

  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();

  useEffect(() => {
    getUserModel();
    getLanguages();
    getCountries();
  }, [])

  const [appUserSettings, setAppUserSettings] = useState({
    languageId: '',
    countryId: '',
  });
  const [appUser, setAppUser] = useState({
    username: '',
    email: '',
    instagram: '',
    registrationDate: '',
    countryId: '',
    languageId: ''
  });
  const [languages, setLanguages] = useState([]);
  const [countries, setCountries] = useState([]);
  
  const getLanguages = async () => {
    const response = await axiosPrivate.get("/language")
    .then((res) => {
      console.log("Language", res.data)
      let newArray = res.data.map( (item) => { return {key: item.id, value: item.name} } )
      setLanguages(newArray);
    })
    .catch( (e) => { console.log("Language error ", e) } );
  }
 
  const getCountries = async () => {
    const response = await axiosPrivate.get("/country")
    .then((res) => {
      console.log("Country", res.data)
      let newArray = res.data.map( (item) => { return {key: item.id, value: item.name} } )
      setCountries(newArray);
    })
    .catch( (e) => { console.log("Country error ", e) } );
  }

  const getUserModel = async () => {
    const response = await axiosPrivate.get(`/user/current/${auth.username}`)
    .then((res) => {
      console.log("APPUSER", res.data)
      setAppUser({
        username: res.data.username,
        email: res.data.email,
        instagram: res.data.instagram,
        registrationDate: res.data.registrationDate,
        countryId: res.data.countryId,
        languageId: res.data.languageId,
      });
    })
    .catch( (e) => { console.log("APPUSER error ", e) } );
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
// https://www.npmjs.com/package/react-native-dropdown-select-list

  return (
    <ImageBackground source={require('../../assets/images/bigbees.jpg')} resizeMode='cover' style={{ flex: 1 }}>
    { appUser && 
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : ""} style={styles.container} >
    <SafeAreaView style={{ flex: 1 }}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.inner}>
          <View style={styles.common}>
            <Text style={styles.title}>Username</Text>
            <Text style={styles.body}>{appUser.username}</Text>
          </View>
          <View style={styles.common}>
            <Text style={styles.title}>Email</Text>
            <TouchableOpacity style={{borderStyle: "solid"}} onPress={() => navigation.navigate('ChangeEmail')}>
              <Text style={styles.body}>{appUser.email}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.common}>
            <Text style={styles.title}>Instagram</Text>
            <Text style={styles.body}>{appUser.instagram}</Text>
          </View>
          <View style={styles.common}>
            <Text style={styles.title}>since</Text>
            <Text style={styles.body}>{appUser.registrationDate.substring(0,10)}</Text>
          </View>
          <View><Text style={styles.title}>App settings</Text></View>
          <SelectList 
            boxStyles={styles.select}
            inputStyles={styles.dropdownText}
            dropdownStyles={styles.select}
            dropdownTextStyles={styles.dropdownText}
            searchPlaceholder="language"
            setSelected={lng => setAppUser({...appUser, languageId: lng})} 
            defaultOption={appUser.languageId}
            data={languages} />
          <SelectList 
            boxStyles={styles.select}
            inputStyles={styles.dropdownText}
            dropdownStyles={styles.select}
            dropdownTextStyles={styles.dropdownText}
            searchPlaceholder="country"
            setSelected={cntr => setAppUser({...appUser, countryId: cntr})} 
            defaultOption={appUser.countryId && appUser.countryId}
            data={countries} />
        </View>
    </TouchableWithoutFeedback>
    </SafeAreaView>
    </KeyboardAvoidingView>
    }
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  common: {
    display: 'flex',
    flexDirection: 'row',
  },
  title:{
    color: "#921bfa",
    fontFamily: 'NunitoBold',
    fontSize: RFValue(21, height),
    marginLeft: wp(5),
    marginTop: hp(1),
    //borderWidth: 1
  },
  body: {
    color: "#921bfa",
    fontFamily: 'NunitoBold',
    fontSize: RFValue(21, height),
    marginLeft: wp(5),
    marginTop: hp(1),
  },
  select: {
    width: wp(60),
    borderWidth: 2,
    borderColor: "yellow",
    marginLeft: wp(5),
    marginTop: hp(1),
  },
  dropdownText: {
    color: "#921bfa",
    fontFamily: 'NunitoSemiBold',
    fontSize: RFValue(20, height),
  }

})