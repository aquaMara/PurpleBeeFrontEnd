import { Dimensions, StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { ImageBackground  } from 'react-native';
import { useFonts } from 'expo-font';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFValue } from "react-native-responsive-fontsize";
import useAuth from '../../security/useAuth';
import useAxiosPrivate from '../../security/useAxiosPrivate';
import { FlatList } from 'react-native';
import { RefreshControl } from 'react-native';

const { height } = Dimensions.get("screen");

export default function MyPatternsScreen({ navigation }) {

  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();

  const [patterns, setPatterns] = useState([]);

  const getPatterns = async () => {
    const response = await axiosPrivate.get(`/payment/${auth.username}`)
    .then((res) => {
      console.log("PATTERNS", res.data)
      setPatterns(res.data);      
    })
    .catch( (e) => { console.log("Patterns error ", e) } );
  }

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    getPatterns();
    wait(20).then(() => setRefreshing(false));
    
  };

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


  return (
    <ImageBackground source={require('../../assets/images/bigbees.jpg')} resizeMode='cover'  style={{ flex: 1 }}>
      {
        patterns.length === 0 ? ( <Text style={styles.hello}>Пока что у Вас нет паттернов</Text> ) 
        : (
        <ScrollView style={styles.inner} nestedScrollEnabled={true} horizontal={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} 
            onRefresh={getPatterns} /> 
        }>
          <View style={styles.helloBox}>
            <Text style={styles.hello}>
              Добро пожаловать, {auth.username}!
              Тут хранятся приобретённые паттерны
            </Text>
          </View>
        <ScrollView style={[styles.inner, {backgroundColor: 'transparent'}]} nestedScrollEnabled={true} horizontal={true}>
          <FlatList keyExtractor={(item) => item.id} data={patterns} numColumns={2} 
            style={{ flex: 1}}
            nestedScrollEnabled={true}
            columnWrapperStyle={{display: 'flex', justifyContent: 'space-between'}}
            renderItem={ ({item}) => (
              <View style={{ width: wp(50), justifyContent: 'center', alignItems: 'center'}}> 
                <TouchableOpacity onPress={() => { navigation.navigate('LivePatternScreen', {id: item.id}) }}>
                  <Image source={{uri: `http://92.51.39.80:8080/pattern/image/${item.id}`}} style={styles.image} resizeMode='cover' />
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
    backgroundColor: 'rgba(255,255,255,0.95)',
  },
  image: {
    width: wp(46),
    height: wp(46),
  },
  helloBox: {
    //backgroundColor: 'white',
    width: wp(100),
    height: hp(12),
  },
  hello: {
    fontFamily: 'NunitoBold',
    fontSize: RFValue(23, height),
    color: "#921bfa",
    alignSelf: 'center',
    marginTop: hp(1),
    lineHeight: wp(6.5)
  },
  text: {
    fontFamily: 'NunitoMedium',
    fontSize: RFValue(20, height),
    color: "#921bfa",
    alignSelf: 'center'
  },
})