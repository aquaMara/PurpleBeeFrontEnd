import React from 'react';
import { Dimensions, Image, ImageBackground, SafeAreaView, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { useState } from 'react';
// import { MaterialCommunityIcons } from '@expo/vector-icons';
import { KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard  } from 'react-native';
import { useFonts } from 'expo-font';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import axios from '../../security/axios';

const { height } = Dimensions.get("screen");

export default function RegistrationScreen({ navigation }) {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');

  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [passwordCheckVisibility, setPasswordCheckVisibility] = useState(true);
  const [usernameError, setUsernameError] = useState(false);
  const [uniquenessError, setUniquenessError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [securityError, setSecurityError] = useState(false);
  const [passwordCheckError, setPasswordCheckError] = useState(false);

  var isDisabled = !username || !email || !password || !passwordCheck 
      || usernameError || uniquenessError || emailError 
      || passwordError || securityError || passwordCheckError;

  const [fontsLoaded] = useFonts({
    NunitoMedium: require('../../assets/fonts/Nunito-Medium.ttf'),
    NunitoBold: require('../../assets/fonts/Nunito-Bold.ttf'),
  })
    
  if (!fontsLoaded) {
    return null;
  }

  const checkUsername = (usn) => {
    setUsername(usn);
    const regex = new RegExp('^[a-zA-Z0-9_]{6,16}$');
    if (!regex.test(usn)) {
      setUsernameError(true);
      setUniquenessError(false);
    } else {
      setUsernameError(false);
      console.log("HH")
      try {
        const response = axios.post("signup/check", usn)
        .then(res => setUniquenessError(res.data))
        .catch(error => { 
          console.log("data", error.response.data);
          console.log("status", error.response.status);
          console.log("headers", error.response.headers);
        });
      } catch(err) {
        console.log(err)
      }
    }    
  }

  const checkEmail = async (eml) => {
    setEmail(eml);
    if (eml == "") {
      setEmailError(true);
    } else {
      setEmailError(false);
    }

  }

  const checkPassword = async (psw) => {
    setPassword(psw);
    // at least one uppercase letter, one number, one special character
    const securityRegex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!*_]).{6,16}$');
    if (!securityRegex.test(psw)) {
      setSecurityError(true);
    } else {
      setSecurityError(false);
    }

    // 6 - 16, only both letters, *!_ and numbers
    const regex = new RegExp('^[a-zA-Z0-9_*!]{6,16}$');
    if (!regex.test(psw)) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  }

  const checkPasswordCheck = (pswch) => {
    setPasswordCheck(pswch);
    console.log(password, pswch, password != pswch);
    if (password != pswch) {
      setPasswordCheckError(true);
    } else {
      setPasswordCheckError(false);
    }
  }

  const handleSubmit = async () => {
    const person = {username, email, password};
    //console.log(person);
    // navigation.navigate("Email")
    try {
      const response = await axios.post("/signup", person)
      .then(navigation.navigate("Email"))
      .catch(error => { 
        console.log("data", error.response.data);
        console.log("status", error.response.status);
        console.log("headers", error.response.headers);
      });
      console.log("response?.data in login:", response?.data);
      console.log("response in login:", response);
    } catch (err) {
      if (!err?.response) {
          console.log("No error response");
      } else if(err.response?.status === 403) {
          console.log("Invalid username or password");
      }
  }}


  return (
    <ImageBackground source={require('../../assets/images/darkbees.jpg')} resizeMode='cover' style={{ flex: 1 }}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null} style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inner}> 
              <View style={styles.box}> 
                <View style={styles.quoteBox}>
                  <Text style={styles.title}>Purple Bee</Text>
                  <Text style={styles.quote}>Добро пожаловать!</Text>
                </View>
                <View style={styles.block}>
                  {usernameError && <Text style={styles.error}>От 6 до 16 символов, только буквы, цифры и нижнее подчёркивание</Text>}
                  {uniquenessError && <Text style={styles.error}>Логин сущестует</Text>}
                  <TextInput style={styles.input}
                    onChangeText={username => checkUsername(username)}
                    value={username} autoCapitalize="none"
                    placeholder="логин" placeholderTextColor={"gray"}/>
                </View>
                <View style={styles.block}>
                  {emailError && <Text style={styles.error}>Email должен быть валидным</Text>}
                  <TextInput style={styles.input}
                    onChangeText={email => setEmail(email)}
                    value={email} autoCapitalize="none" keyboardType='email-address'
                    placeholder="email" placeholderTextColor={"gray"}/>
                </View>
                <View style={styles.block}>
                  {passwordError && <Text style={styles.error}>От 6 до 16 символов, только латинские буквы, цифры, нижнее подчёркивание, звёздочка, восклицательный знак</Text>}
                  {securityError && <Text style={styles.error}>Хотя бы одна большая буква, одна цифра, один разрешённый специальный символ</Text>}
                  <View style={styles.sticked}>
                  <TextInput style={styles.input}
                    onChangeText={password => checkPassword(password)}
                    value={password} autoCapitalize="none" secureTextEntry={passwordVisibility}
                    placeholder="пароль" placeholderTextColor={"gray"}/>
                    <TouchableOpacity style={styles.icon} onPress={() => setPasswordVisibility(!passwordVisibility)}>
                      <Image source={require('../../assets/images/bee.png')} style={styles.image} />
                    </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.block}>
                  {passwordCheckError && <Text style={styles.error}>Пароли должны совпадать</Text>}
                  <View style={styles.sticked}>
                  <TextInput style={styles.input}
                    onChangeText={passwordCheck => checkPasswordCheck(passwordCheck)}
                    value={passwordCheck} autoCapitalize="none" secureTextEntry={passwordCheckVisibility}
                    placeholder="повтор пароля" placeholderTextColor={"gray"}/>
                    <TouchableOpacity style={styles.icon} onPress={() => setPasswordCheckVisibility(!passwordCheckVisibility)}>
                      <Image source={require('../../assets/images/bee.png')} style={styles.image} />
                    </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity disabled={isDisabled} 
                  style={(isDisabled) ? styles.buttonDisabled : styles.button} 
                  onPress={handleSubmit}><Text style={styles.buttonText}>регистрация</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </SafeAreaView>
      </KeyboardAvoidingView>
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
    height: hp(70),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(8, 0, 10, 0.9)',
  },
  quoteBox: {
    width: wp(80),
    marginBottom: hp(3),
  },
  quote: {
    color: '#921bfa',
    fontFamily: 'NunitoBold',
    fontSize: RFValue(23, height),
    textAlign: 'center',
  },
  title: {
    color: '#921bfa',
    fontFamily: 'NunitoBold',
    fontSize: RFValue(23, height),
    textAlign: 'center',
    textTransform: 'uppercase',
    marginBottom: hp(1),
  },
  image: {
    width: wp(10),
    height: wp(10),
    marginLeft: -wp(12),
    marginTop: -hp(1),
  },
  sticked: {
    flexDirection:"row",
    alignItems:'center',
    alignSelf: 'center',
  },
  block: {
    marginBottom: hp(1),
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
  buttonDisabled: {
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
    opacity: 0.5,
  },
  buttonText: {
    fontFamily: 'NunitoMedium',
    fontSize: RFValue(20, height),
    color: "#921bfa",
  },
  input: {
    borderWidth: 2,
    color: '#921bfa',
    borderRadius: 10,
    padding: 10,
    width: wp(78),
    backgroundColor: "black",
    borderColor: "yellow",
    fontFamily: 'NunitoMedium',
    fontSize: RFValue(16, height),
    alignSelf: "center",
  },
  error: {
    color: 'yellow',
    fontFamily: 'NunitoMedium',
    fontSize: RFValue(14, height),
    textAlign: 'left'
  },
})