import React from 'react';
import { Dimensions, ScrollView, Image, ImageBackground, SafeAreaView, StyleSheet, Text, TextInput, View, Field, TouchableOpacity, Alert } from 'react-native';
import { Formik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
// import { MaterialCommunityIcons } from '@expo/vector-icons';
import { KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard  } from 'react-native';
import { useFonts } from 'expo-font';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { useContext } from "react";
import axios from '../../security/axios';
//import axios from 'axios';
//import axios from 'axios';
import AuthContext from '../../security/AuthProvider';
import useAuth from '../../security/useAuth';

const { height } = Dimensions.get("screen");

export default function LoginScreen({ navigation }) {
    
  // const navigation = useNavigation();
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const { auth, setAuth } = useAuth();
// https://earlyredmouse75.conveyor.cloud/Parse/GetCarCompanies
// http://83.222.9.150:443/swagger/index.html
// "https://83.222.9.150:443/Parse/GetCarCompanies"
  const getNikita = async () => {
    const response = await axios.get("http://83.222.9.150:443/Parse/GetCarCompanies", 
                          {
                              headers: { "Content-Type": "application/json"}
                          }
                      ).then(res=>console.log(res)).catch(err=>console.log(err))
                      console.log('NIKITA', response)
  }

  const [fontsLoaded] = useFonts({
    NunitoMedium: require('../../assets/fonts/Nunito-Medium.ttf'),
    NunitoBold: require('../../assets/fonts/Nunito-Bold.ttf'),
  })
    
  if (!fontsLoaded) {
    return null;
  }

  return (
    <ImageBackground source={require('../../assets/images/darkbees.jpg')} resizeMode='cover' style={{ flex: 1 }}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null} style={{ flex: 1 }}>
        <View style={styles.container}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inner}>  
            <View style={styles.box}> 
              <View style={styles.quoteBox}>
                <Text style={styles.title}>Purple Bee</Text>
                <Text style={styles.quote}>Добро пожаловать!</Text>
              </View>          
                <Formik initialValues={{ username: '', password: '' }} 
                  onSubmit={async (values, { setSubmitting }) => {
                    setSubmitting(true);
                    try {
                      const response = await axios.post("/signin", 
                          values, 
                          {
                              headers: { "Content-Type": "application/json"}
                          }
                      );
                      // setSuccess(true);
                      console.log("response?.data in login:", response?.data);
                      console.log("response in login:", response);
                      // console.log("JSON.stringify(response) in login:", JSON.stringify(response));
                      const token = response?.data?.token;
                      console.log("accessToken(token) in login:", token);
                      const username = response?.data?.username;
                      console.log("username in login:", username);
                      const role = response?.data?.role;
                      console.log("role in login:", role);
                      // setAuth({ username, password, role, token});
                      setAuth({ username, role, token});
                      if (role === "USER") {
                        console.log('ROOT')
                          navigation.navigate("Root");
                          console.log('hgghghghhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh')
                          //navigation.reset("Root");
                      }
                      if (role === "ADMIN") {
                          //navigate("/admin/subjects");
                      }
          
                  } catch (err) {
                      console.log(err.response?.status, err.response.data.message, 'errrr')
                      Alert.alert('Ошибка!', err.response.data.message);
                      /*
                      if(err.response?.status === 403 || err.response?.status === 404) {
                        console.log("Invalid username or password");
                        alert("Invalid username or password");
                        Alert.alert('Ошибка!', 'err.response.data.message')
                      } else if(err.response?.status === 400) {
                        console.log("Not approved");
                        alert("Please approve your registration via email");
                      } else {
                        console.log("No error response");
                        alert("Invalid username or password");
                      }
                      */
                  }
                  }}>
                  {({ handleChange, handleBlur, handleSubmit, isSubmitting, errors, touched, dirty, isValid, values }) => (
                  <View>
                    <TextInput style={styles.input}
                      onChangeText={handleChange('username')}
                      value={values.username} autoCapitalize="none"
                      placeholder="логин" placeholderTextColor={"gray"}
                      />
                      <View style={styles.sticked}>
                        <TextInput style={styles.input}
                          onChangeText={handleChange('password')}
                          value={values.password} autoCapitalize="none"
                          placeholder="пароль" placeholderTextColor={"gray"}
                          secureTextEntry={passwordVisibility}
                        />
                        <TouchableOpacity style={styles.icon} onPress={() => setPasswordVisibility(!passwordVisibility)}>
                          <Image source={require('../../assets/images/bee.png')} style={styles.image} />
                        </TouchableOpacity>
                      </View>
                      <TouchableOpacity disabled={!values.username || !values.password} style={(!values.username || !values.password) ? styles.buttonDisabled : styles.button} 
                          onPress={handleSubmit}><Text style={styles.buttonText}>вход</Text>
                      </TouchableOpacity>
                  </View>
                  )}
                </Formik>
                </View> 
            </View>
          </TouchableWithoutFeedback>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  inner: {
      flex: 1,
      justifyContent: 'center',
      alignItems: "center",
      backgroundColor: 'transparent'
  },
  box: {
    width: wp(90),
    height: hp(50),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(8, 0, 10, 0.9)',
  },
  quoteBox: {
    width: wp(80),
    marginBottom: hp(3),
    //alignSelf: 'center'
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
    marginTop: hp(2),
  },
  sticked: {
    flexDirection:"row",
    alignItems:'center',
    alignSelf: 'center',
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
    marginTop: hp(2),
    fontFamily: 'NunitoMedium',
    fontSize: RFValue(16, height),
    alignSelf: "center",
  },
})