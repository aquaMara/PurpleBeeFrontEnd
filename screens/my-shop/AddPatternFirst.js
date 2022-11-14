import { Dimensions, StyleSheet, Text, View, Image, Button, SafeAreaView, ScrollView, TouchableOpacity, TextInput } from 'react-native'
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

const { height } = Dimensions.get("screen");


export default function AddPatternFirst({ navigation }) {

  const [image, setImage] = useState(null);
  const [pattern, setPattern] = useState({});
  const [patternName, setPatternName] = useState();
  const [craft, setCraft] = useState();
  const [crafts, setCrafts] = useState([]);
  const [category, setCategory] = useState();
  const [categories, setCategories] = useState([]);
  const [difficultyLevel, setDifficultyLevel] = useState();
  const [language, setLanguage] = useState();
  const [languages, setLanguages] = useState([]);
  const [price, setPrice] = useState();
  const [currency, setCurrency] = useState();
  const [currencies, setCurrencies] = useState([]);
  const [littleDescription, setLittleDescription] = useState();

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    getCrafts();
    getCategories();
    getLanguages();
    getCurrencies();
  }, [])

  const getCrafts = async () => {
    const response = await axiosPrivate.get("/craft")
    .then((res) => {
      console.log("Craft", res.data)
      let newArray = res.data.map( (item) => { return {key: item.id, value: item.name} } )
      setCrafts(newArray);
    })
    .catch( (e) => { console.log("Craft error ", e) } );
  }

  const getCategories = async () => {
    const response = await axiosPrivate.get("/category")
    .then((res) => {
      console.log("Category", res.data)
      let newArray = res.data.map( (item) => { return {key: item.id, value: item.name} } )
      setCategories(newArray);
    })
    .catch( (e) => { console.log("Category error ", e) } );
  }

  const getLanguages = async () => {
    const response = await axiosPrivate.get("/language")
    .then((res) => {
      console.log("Language", res.data)
      let newArray = res.data.map( (item) => { return {key: item.id, value: item.name} } )
      setLanguages(newArray);
    })
    .catch( (e) => { console.log("Language error ", e) } );
  }

  const getCurrencies = async () => {
    const response = await axiosPrivate.get("/currency")
    .then((res) => {
      console.log("Currency", res.data)
      let newArray = res.data.map( (item) => { return {key: item.id, value: item.name} } )
      setCurrencies(newArray);
    })
    .catch( (e) => { console.log("Currency error ", e) } );
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const data = [
    {key:'1',value:'English'},
    {key:'3',value:'Spanish'},
    {key:'2',value:'Russian'},
  ];

  const handleSubmit = () => {
    setPattern({patternName, craft, category, difficultyLevel, language, price, littleDescription});
    console.log(pattern);
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
  
// https://docs.expo.dev/versions/latest/sdk/imagepicker/
return (
  <ImageBackground source={require('../../assets/images/bigbees.jpg')} resizeMode='cover'  style={{ flex: 1 }}>
  <ScrollView>
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      style={{ flex: 1 }}>
      
      <SafeAreaView style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <View>
              <View style={styles.imageContainer}>
                {image && <Image source={{ uri: image }} style={styles.image} />}
              </View>
              <TouchableOpacity onPress={pickImage} style={styles.button}>
                <Text style={styles.buttonText}>add an image</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TextInput style={styles.input}
                onChangeText={patternName => setPatternName(patternName)}
                value={patternName}
                placeholder="name your pattern"
                placeholderTextColor={"gray"} />
              <SelectList 
                boxStyles={styles.select}
                inputStyles={styles.dropdownText}
                dropdownStyles={styles.select}
                dropdownTextStyles={styles.dropdownText}
                searchPlaceholder="craft"
                setSelected={setCraft} 
                data={crafts} 
                onSelect={console.log(craft)} />
              <SelectList 
                boxStyles={styles.select}
                inputStyles={styles.dropdownText}
                dropdownStyles={styles.select}
                dropdownTextStyles={styles.dropdownText}
                searchPlaceholder="category"
                setSelected={setCategory} 
                data={categories} 
                onSelect={console.log(category)} />
              <SelectList 
                boxStyles={styles.select}
                inputStyles={styles.dropdownText}
                dropdownStyles={styles.select}
                dropdownTextStyles={styles.dropdownText}
                searchPlaceholder="language"
                setSelected={setLanguage} 
                data={languages} 
                onSelect={console.log(language)} />
              <SelectList 
                boxStyles={styles.select}
                inputStyles={styles.dropdownText}
                dropdownStyles={styles.select}
                dropdownTextStyles={styles.dropdownText}
                searchPlaceholder="difficultyLevel"
                setSelected={setDifficultyLevel} 
                data={data} 
                onSelect={console.log(difficultyLevel)} />
              <TextInput style={styles.input}
                onChangeText={price => setPrice(price)}
                value={price}
                keyboardType="numeric"
                placeholder="price"
                placeholderTextColor={"gray"} />
              <SelectList 
                boxStyles={styles.select}
                inputStyles={styles.dropdownText}
                dropdownStyles={styles.select}
                dropdownTextStyles={styles.dropdownText}
                searchPlaceholder="currency"
                setSelected={setCurrency} 
                data={currencies} 
                onSelect={console.log(currency)} />
              <TextInput style={styles.inputArea}
                multiline
                numberOfLines={4}
                onChangeText={littleDescription => setLittleDescription(littleDescription)}
                value={littleDescription}
                placeholder="little description of your pattern"
                placeholderTextColor={"gray"} />
                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                  <Text style={styles.buttonText}>save</Text>
                </TouchableOpacity>
              </View>
            <TouchableOpacity style={{borderStyle: "solid"}} onPress={handleSubmit}>
              <Text>add pattern</Text>
            </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
      </SafeAreaView>
    </KeyboardAvoidingView>
  </ScrollView>
      </ImageBackground>
);
}


const styles = StyleSheet.create({
  container: {
      flex: 1,
  },
  inner: {
      flex: 1,
      justifyContent: "flex-end",
      alignItems: "center",
  },
  imageContainer: {
    marginTop: hp(1),
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
  }
});
/*
'#9754CB',
      tabBarInactiveBackgroundColor: '#28104E',
      tabBarInactiveBackgroundColor: '#482673',
      tabBarInactiveBackgroundColor: '#6237A0',
      tabBarInactiveBackgroundColor: '#6237A0',
      */
