import { Button, Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard  } from 'react-native';
import { useFonts } from 'expo-font';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { FieldArray } from 'formik';
import { Formik } from 'formik';
import { Field } from 'formik';
import { TextInput } from 'react-native-web';

const { height } = Dimensions.get("screen");

export default function AddPatternSecond() {

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

    const initialValues = {
      friends: [
        {
          name: '',
          email: '',
        },
      ],
    };
  
    return (
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : ""} style={styles.container} >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Formik
      initialValues={initialValues}
      onSubmit={async (values) => {
        await new Promise((r) => setTimeout(r, 500));
        alert(JSON.stringify(values, null, 2));
      }}
    >
      {({ values }) => (
        <View>
          <FieldArray name="friends">
            {({ insert, remove, push }) => (
              <View>
                {values.friends.length > 0 &&
                  values.friends.map((friend, index) => (
                    <View className="row" key={index}>
                      <View className="col">
                        <TextInput
                          name={`friends.${index}.name`}
                          placeholder="Jane Doe"
                          type="text"
                        />
                      </View>
                      <View className="col">
                        <TextInput
                          name={`friends.${index}.email`}
                          placeholder="jane@acme.com"
                          type="email"
                        />
                      </View>
                      <View className="col">
                        <Button
                          type="button"
                          className="secondary"
                          title="j"
                          onClick={() => remove(index)}
                        >
                          
                        </Button>
                      </View>
                    </View>
                  ))}
                <Button
                  type="button"
                  className="secondary"
                  title="h"
                  onClick={() => push({ name: '', email: '' })}
                >
                </Button>
              </View>
            )}
          </FieldArray>
          <Button type="submit" title="g"></Button>
        </View>
      )}
    </Formik>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    )
  }
  
  const styles = StyleSheet.create({})