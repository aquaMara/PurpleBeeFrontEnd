import { Dimensions, StyleSheet, Text, View, Image, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Button } from 'react-native'
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
import { FlatList } from 'react-native';
// import { FlatList } from 'react-native-gesture-handler';

const { height } = Dimensions.get("screen");

export default function PatternsPage({ navigation }) {

  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();

  const [patterns, setPatterns] = useState([]);
  const [search, setSearch] = useState();

  const getPatterns = async () => {
    const response = await axiosPrivate.get("/pattern/all")
    .then((res) => {
      console.log("PATTERNS", res.data)
      setPatterns(res.data);      
    })
    .catch( (e) => { console.log("Patterns error ", e) } );
  }

  useEffect(() => {
    getPatterns();
  }, []);

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
  if (!patterns) {
    return null
  }

  const searchByName = () => {
    console.log(search);
    const response = axiosPrivate.get(`/pattern/all/${search}`)
    .then((res) => {
      console.log("PATTERNS", res.data)
      setPatterns(res.data);      
    })
    .catch( (e) => { console.log("Patterns error ", e) } );
  }


  return (
    <ImageBackground source={require('../../assets/images/bigbees.jpg')} resizeMode='cover'  style={{ flex: 1 }}>
      {
        patterns.length === 0 ? ( <Text>noooooooooooooooooooo</Text> ) 
        : (
        <ScrollView style={styles.inner} nestedScrollEnabled={true} horizontal={false}>
          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginBottom: hp(2)}}>
            <TextInput style={styles.input}
                  onChangeText={n => setSearch(n)}
                  value={search}
                  placeholder="enter pattern name"
                  placeholderTextColor={"gray"} />
            <TouchableOpacity style={styles.button} onPress={searchByName}>
              <Text style={styles.buttonText}></Text>
            </TouchableOpacity>
          </View>
        <ScrollView style={styles.inner} nestedScrollEnabled={true} horizontal={true}>
          <FlatList keyExtractor={(item) => item.id} data={patterns} numColumns={2} 
            style={{ flex: 1}}
            nestedScrollEnabled={true}
            columnWrapperStyle={{display: 'flex', justifyContent: 'space-between'}}
            renderItem={ ({item}) => (
              <View style={{borderWidth: 1, borderColor: 'yellow', width: wp(50), justifyContent: 'center', alignItems: 'center'}}>
                <Image source={require('../../assets/images/kitty.jpg')} style={{width: wp(46), height: wp(46)}} resizeMode='cover' />
                <TouchableOpacity onPress={() => { navigation.navigate('ThisPatternsScreen', {id: item.id}) }}>
                  <Text style={styles.text}>{item.name}</Text>
                </TouchableOpacity>
              </View>
            )} />
        </ScrollView>
        </ScrollView>
        )}
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  inner: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
  imageContainer: {
    marginTop: hp(4),
    width: wp(90),
    height: hp(40),
    borderWidth: 2,
    borderColor: "#921bfa",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255, 0.8)",
  },
  image: {
    width: wp(90),
    height: hp(40),
  },
  button: {
    marginTop: hp(1),
    width: wp(10),
    height: wp(10),
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
  input: {
    borderWidth: 2,
    color: '#921bfa',
    borderRadius: 10,
    padding: 10,
    width: wp(78),
    backgroundColor: "white",
    borderColor: "yellow",
    flexDirection:'row',
    marginTop: hp(1),
    fontFamily: 'NunitoMedium',
    fontSize: RFValue(16, height),
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
  select: {
    width: wp(78),
    borderWidth: 3,
    borderColor: "yellow",
    backgroundColor: "white",
    marginTop: hp(1),
  },
  dropdownText: {
    fontFamily: 'NunitoMedium',
    fontSize: RFValue(16, height),
    color: "#921bfa",
  },


  live: {
    marginTop: hp(2),
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  text: {
    fontFamily: 'NunitoMedium',
    fontSize: RFValue(20, height),
    color: "#921bfa",
    alignSelf: 'center'
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
    width: wp(100),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxes: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: wp(45),
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
})