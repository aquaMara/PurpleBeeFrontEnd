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
import CheckBox from 'expo-checkbox';

const { height } = Dimensions.get("screen");


export default function AddPatternFirst({ navigation }) {

  const [image, setImage] = useState(null);
  const [pattern, setPattern] = useState({
    name: '',
    craftId: '',
    categoryId: '',
    currencyId: '',
    difficultyLevel: '',
    languageId: '',
    littleDescription: '',
    price: ''
  });
  const [name, setName] = useState();
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
  const [patternId, setPatternId] = useState();

  const [liveRows, setLiveRows] = useState(
    [{
      rowNumber: "",
      schema: "",
      isInfoRow: false,
      isTitleRow: false
    }]
  );

  const addRow = () => {
    const plusCurrentRow = [...liveRows];
    plusCurrentRow.push( { rowNumber: "", schema: "", isInfoRow: false, isTitleRow: false } );
    setLiveRows(plusCurrentRow);
  }

  const deleteRow = (key) => {
    /*
    console.log(key);
    const arr = liveRows.filter((input, index) => index != key);
    setLiveRows(arr)
    */
    setLiveRows([
      ...liveRows.slice(0, key),
      ...liveRows.slice(key + 1)
    ]);
  }

  const fillInput = (text, key) => {
    const plusCurrentRow = [...liveRows];
    plusCurrentRow[key].schema = text;
    plusCurrentRow[key].rowNumber = key;
    setLiveRows(plusCurrentRow);
  }

  const fillTitle = (choice, key) => {
    const plusCurrentRow = [...liveRows];
    plusCurrentRow[key].isTitleRow = choice;
    plusCurrentRow[key].rowNumber = key;
    setLiveRows(plusCurrentRow);
  }

  const fillInfo = (choice, key) => {
    const plusCurrentRow = [...liveRows];
    plusCurrentRow[key].isInfoRow = choice;
    plusCurrentRow[key].rowNumber = key;
    setLiveRows(plusCurrentRow);
  }

  const sendLivePattern = () => {
    setPattern({name, craft, category, difficultyLevel, language, currency, price, littleDescription});
    console.log("LIVEROWS", liveRows);
    console.log("PATTERN", pattern);
    console.log("USERNAME", auth.username)
    // save pattern and get id to send livepattern  // send pattern with username
    const response = axiosPrivate.post(`/pattern/${auth.username}`, pattern)
    .then((res) => {
      console.log("Patterns response", res.data)
      const response2 = axiosPrivate.post(`/live-row/${res.data}`, liveRows)
    })
    .catch( (e) => { console.log("Pattern error ", e) } );
  }

  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();

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
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    
    console.log("result", result);
    if (!result.cancelled) {
      setImage(result.uri);
      const fd = new FormData();
      fd.append("data", result);
      const uploadResult = await FileSystem.uploadAsync('http://localhost:8000/patterns/upload/', result.uri, {
        httpMethod: 'POST',
        uploadType: FileSystemUploadType.MULTIPART,
        fieldName: 'data',
        options: {
          Authorization: `Bearer ${auth?.token}`,
        }
      });
      console.log("HHHH", uploadResult);
    }
    console.log("image ", result)
  };

  const data = [
    {key:'BEGINNER',value:'BEGINNER'},
    {key:'INTERMEDIATE',value:'INTERMEDIATE'},
    {key:'ADVANCED',value:'ADVANCED'},
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

  const handleSubmit = () => {
    //setPattern({name: name, craftId: craft, categoryId: category, difficultyLevel: difficultyLevel, languageId: language, currencyId: currency, price, littleDescription});
    console.log("pattern ", pattern);
    console.log("image ", image);
  }
  
// https://docs.expo.dev/versions/latest/sdk/imagepicker/
return (
  <ImageBackground source={require('../../assets/images/bigbees.jpg')} resizeMode='cover'  style={{ flex: 1 }}>
  <ScrollView>
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
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
                onChangeText={n => setPattern({
                  name: n,
                  craftId: pattern.craftId,
                  categoryId: pattern.categoryId,
                  currencyId: pattern.currencyId,
                  difficultyLevel: pattern.difficultyLevel,
                  languageId: pattern.languageId,
                  littleDescription: pattern.littleDescription,
                  price: pattern.price
                })}
                value={pattern.name}
                placeholder="name your pattern"
                placeholderTextColor={"gray"} />
              <SelectList 
                boxStyles={styles.select}
                inputStyles={styles.dropdownText}
                dropdownStyles={styles.select}
                dropdownTextStyles={styles.dropdownText}
                searchPlaceholder="craft"
                setSelected={cr => setPattern({
                  ...pattern,
                  craftId: cr
                })} 
                data={crafts} 
                onSelect={console.log(craft)} />
              <SelectList 
                boxStyles={styles.select}
                inputStyles={styles.dropdownText}
                dropdownStyles={styles.select}
                dropdownTextStyles={styles.dropdownText}
                searchPlaceholder="category"
                setSelected={ct => setPattern({...pattern, categoryId: ct})} 
                data={categories} 
                onSelect={console.log(category)} />
              <SelectList 
                boxStyles={styles.select}
                inputStyles={styles.dropdownText}
                dropdownStyles={styles.select}
                dropdownTextStyles={styles.dropdownText}
                searchPlaceholder="language"
                setSelected={lng => setPattern({...pattern, languageId: lng})} 
                data={languages} 
                onSelect={console.log(language)} />
              <SelectList 
                boxStyles={styles.select}
                inputStyles={styles.dropdownText}
                dropdownStyles={styles.select}
                dropdownTextStyles={styles.dropdownText}
                searchPlaceholder="difficultyLevel"
                setSelected={dfl => setPattern({...pattern, difficultyLevel: dfl})} 
                data={data} 
                onSelect={console.log(difficultyLevel)} />
              <TextInput style={styles.input}
                onChangeText={pr => setPattern({...pattern, price: pr})}
                value={pattern.price}
                keyboardType="numeric"
                placeholder="price"
                placeholderTextColor={"gray"} />
              <SelectList 
                boxStyles={styles.select}
                inputStyles={styles.dropdownText}
                dropdownStyles={styles.select}
                dropdownTextStyles={styles.dropdownText}
                searchPlaceholder="currency"
                setSelected={cru => setPattern({...pattern, currencyId: cru})} 
                data={currencies} 
                onSelect={console.log(currency)} />
              <TextInput style={styles.inputArea}
                multiline
                numberOfLines={4}
                onChangeText={ld => setPattern({...pattern, littleDescription:ld})}
                value={pattern.littleDescription}
                placeholder="little description of your pattern"
                placeholderTextColor={"gray"} />
                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                  <Text style={styles.buttonText}>save</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.live}>
                <Text style={styles.text}>Please, fill the Live Pattern</Text>
                  {liveRows.map((liveRow, key)=>(
                <View styles={{ flex:1 }}>
                  <View style={styles.together} key={key}>
                    <Text style={styles.text}>{key}</Text>
                    <TextInput style={styles.schemaInput} key={key}
                      onChangeText={(text)=>fillInput(text, key)}
                      value={liveRow.schema}
                      placeholder="schema" placeholderTextColor={"gray"} />
                    <TouchableOpacity onPress = {()=> deleteRow(key)} style={styles.deleteButton}>
                      <Text style={styles.buttonText}>X</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.together}>
                    <View style={styles.checkboxes}>
                      <CheckBox style={styles.checkbox} key={key}
                        disabled={false}
                        value={liveRow.isTitleRow}
                        onValueChange={(title) => fillTitle(title, key)} />
                      <Text style={styles.text}>Tick if Title</Text>
                    </View>
                    <View style={styles.checkboxes}>
                      <CheckBox style={styles.checkbox} key={key}
                        disabled={false}
                        value={liveRow.isInfoRow}
                        onValueChange={info => fillInfo(info, key)} />
                      <Text style={styles.text}>Tick if Info</Text>
                    </View>
                  </View>
                </View>))}
              <View style={styles.together}>
                <TouchableOpacity onPress = {addRow} style={styles.button}>
                  <Text style={styles.buttonText}>add row</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress = {sendLivePattern} style={styles.button}>
                  <Text style={styles.buttonText}>send</Text>
                </TouchableOpacity>
              </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
      </SafeAreaView>
    </KeyboardAvoidingView>
  </ScrollView>
      </ImageBackground>
);
}


const styles = StyleSheet.create({
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

});
/*
'#9754CB',
      tabBarInactiveBackgroundColor: '#28104E',
      tabBarInactiveBackgroundColor: '#482673',
      tabBarInactiveBackgroundColor: '#6237A0',
      tabBarInactiveBackgroundColor: '#6237A0',
      */
