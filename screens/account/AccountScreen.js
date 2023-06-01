import { ImageBackground, ScrollView, SafeAreaView, Dimensions, StyleSheet, Text, View, TouchableOpacity, TextInput, Picker, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard  } from 'react-native';
import { useFonts } from 'expo-font';
import SelectDropdown from 'react-native-select-dropdown';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import SelectList from 'react-native-dropdown-select-list'
import useAuth from '../../security/useAuth';
import useAxiosPrivate from '../../security/useAxiosPrivate';
import { useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get("screen");


export default function AccountScreen({ navigation }) {

  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();

  useEffect(() => {
    getUserModel();
    getLanguages();
    getCountries();
  }, [])

  const [letter, setLetter] = useState({});
  const addLetter = () => {
    const response = axiosPrivate.post(`/user/support/${appUser.username}`, {body: letter, title: 'Support Letter'})
    .then((res) => {
      Alert.alert('Спасибо за обращение!', "В течение трёх дней ответ придёт к Вам на почту")
    })
    .catch( (e) => { console.log("addLetter error ", e) } );
    setLetter({});
  }

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

  const handleDeleteAccount = () => {
    Alert.alert(
      'Внимание!',
      'Вы уверены, что хотите удалить аккаунт?',
      [
        {
          text: 'Удалить мой аккаунт',
          onPress: () => deleteAccount(),
          style: 'default',
        },
        {
          text: 'Отмена',
          onPress: () => Alert.alert('Ваш аккаунт не будет удалён'),
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
        onDismiss: () =>
          Alert.alert(
            'This alert was dismissed by tapping outside of the alert dialog.',
          ),
      },
    );
  }

  const deleteAccount = async () => {
    console.log('ghh');
    const response = await axiosPrivate.put("/user/delete")
    .then((res) => {
      console.log("deleteAccount", res.data);
      navigation.navigate('Welcome');      
    })
    .catch( (e) => { console.log("deleteAccount error ", e) } );
    
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
            <Text style={styles.title}>Логин</Text>
            <TouchableOpacity style={{borderStyle: "solid"}}>
              <Text style={styles.body}>{appUser.username}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.common}>
            <Text style={styles.title}>Email</Text>
            <TouchableOpacity style={{borderStyle: "solid"}}>
              <Text style={styles.body}>{appUser.email}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.common}>
            <Text style={styles.title}>PurpleBee с</Text>
            <Text style={styles.body}>{appUser.registrationDate.substring(0,10)}</Text>
          </View>
          <View>
            <Text style={[styles.section]}>***Обратиться в поддержку***</Text>
            <View>
              <TextInput style={styles.inputArea}
                multiline numberOfLines={4}
                placeholder="Введите Ваше письмо..." placeholderTextColor={"gray"}
                value={letter} onChangeText={c => setLetter(c)} />
                <TouchableOpacity onPress={addLetter} style={styles.button}>
                  <Text style={styles.buttonText}>отправить</Text>
                </TouchableOpacity>
            </View>
          </View>
          
          <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteAccount()}>
              <Text style={styles.buttonText}>удалить аккаунт</Text>
          </TouchableOpacity>
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
    backgroundColor: 'rgba(255,255,255,0.9)',
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
    textAlignVertical: 'top',
    alignSelf: 'center'
  },
  deleteButton: {
    //marginTop: hp(1),
    //marginBottom: hp(5),
    //marginTop: 'auto',
    marginTop: hp(20),
    width: wp(80),
    height: hp(5),
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#921bfa",
    justifyContent: "center",
    alignItems:"center",
    alignSelf: "center",
    backgroundColor: "white",
  },
})

/*
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

            */