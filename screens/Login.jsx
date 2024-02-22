import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
import styles from './login.style';
import { BackButton, Button } from '../components';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { COLORS } from '../constants';
import { rootUrl } from '../hook/rootUrl';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().min(8, 'Password must be at least 8 characters long').required('Required'),
});

const Login = ({ navigation }) => {
  const [loader, setLoader] = useState(false);
  const [obsecureText, setObsecureText] = useState(true);

  const endpoint = `${rootUrl}users/login/`;

  const handleLogin = async (values) => {
    setLoader(true);

    try {
      const response = await axios.post(endpoint, values);

      if (response.status === 200) {
        const { access } = response.data;
        await AsyncStorage.setItem('accessToken', access);
        navigation.replace('Profile');
      } else {
        Alert.alert('Error', 'Invalid credentials. Please try again.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while logging in. Please try again later.');
    } finally {
      setLoader(false);
    }
  };

  return (
    <ScrollView>
      <SafeAreaView style={{ marginHorizontal: 20 }}>
        <View>
          <BackButton onPress={() => navigation.goBack()} />
          <Image source={require('../assets/images/bk.png')} style={styles.cover} />
          <Text style={styles.title}>Unlimited Wonderful Items</Text>

          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            {({ handleChange, handleBlur, touched, handleSubmit, values, errors, isValid }) => (
              <View style={{ flex: 1 }}>
                <View style={styles.wrapper}>
                  <Text style={styles.label}>Email</Text>
                  <View style={styles.inputWrapper(touched.email ? COLORS.secondary : COLORS.offwhite)}>
                    <MaterialCommunityIcons name='email-outline' size={20} color={COLORS.gray} style={styles.iconStyles} />
                    <TextInput
                      placeholder='Enter email'
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                      autoCapitalize='none'
                      autoCorrect={false}
                      style={{ flex: 1 }}
                    />
                  </View>
                  {touched.email && errors.email && <Text style={styles.errorMessage}>{errors.email}</Text>}
                </View>

                <View style={styles.wrapper}>
                  <Text style={styles.label}>Password</Text>
                  <View style={styles.inputWrapper(touched.password ? COLORS.secondary : COLORS.offwhite)}>
                    <MaterialCommunityIcons name='lock-outline' size={20} color={COLORS.gray} style={styles.iconStyles} />
                    <TextInput
                      secureTextEntry={obsecureText}
                      placeholder='Enter password'
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                      autoCapitalize='none'
                      autoCorrect={false}
                      style={{ flex: 1 }}
                    />
                    <TouchableOpacity onPress={() => setObsecureText(!obsecureText)}>
                      <MaterialCommunityIcons name={obsecureText ? 'eye-outline' : 'eye-off-outline'} size={18} />
                    </TouchableOpacity>
                  </View>
                  {touched.password && errors.password && <Text style={styles.errorMessage}>{errors.password}</Text>}
                </View>

                <Button
                  loader={loader}
                  title='LOGIN'
                  onPress={handleSubmit}
                  isValid={isValid}
                />

                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                  <Text style={styles.register}>Register</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>

        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Login;
