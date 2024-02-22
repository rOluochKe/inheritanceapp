import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons, AntDesign, EvilIcons } from '@expo/vector-icons';
import styles from './login.style';
import { BackButton, Button } from '../components';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { COLORS } from '../constants';
import { rootUrl } from '../hook/rootUrl';

const validationSchema = Yup.object().shape({
  first_name: Yup.string().min(3, 'First name must be at least 3 characters long').required('Required'),
  last_name: Yup.string().min(3, 'Last name must be at least 3 characters long').required('Required'),
  location: Yup.string().min(6, 'Location must be at least 6 characters long').required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().min(8, 'Password must be at least 8 characters long').required('Required'),
});

const Register = ({ navigation }) => {
  const [loader, setLoader] = useState(false);
  const [obscureText, setObscureText] = useState(true);

  const endpoint = `${rootUrl}users/register/`;

  const handleRegister = async (values) => {
    setLoader(true);

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        navigation.navigate('Login');
        Alert.alert('Success', 'Registration successful. Please login to continue.');
      } else {
        Alert.alert('Error', 'Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('Error registering user:', error);
      Alert.alert('Error', 'An error occurred while registering the user. Please try again later.');
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
            initialValues={{ first_name: '', last_name: '', location: '', email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleRegister}
          >
            {({ handleChange, handleBlur, touched, handleSubmit, values, errors, isValid }) => (
              <View>
                <View style={styles.wrapper}>
                  <Text style={styles.label}>First name</Text>
                  <View style={styles.inputWrapper(touched.first_name ? COLORS.secondary : COLORS.offwhite)}>
                    <AntDesign name='adduser' size={20} color={COLORS.gray} style={styles.iconStyles} />
                    <TextInput
                      placeholder='Enter first name'
                      onChangeText={handleChange('first_name')}
                      onBlur={handleBlur('first_name')}
                      value={values.first_name}
                      autoCapitalize='none'
                      autoCorrect={false}
                      style={{ flex: 1 }}
                    />
                  </View>
                  {touched.first_name && errors.first_name && <Text style={styles.errorMessage}>{errors.first_name}</Text>}
                </View>

                <View style={styles.wrapper}>
                  <Text style={styles.label}>Last name</Text>
                  <View style={styles.inputWrapper(touched.last_name ? COLORS.secondary : COLORS.offwhite)}>
                    <AntDesign name='adduser' size={20} color={COLORS.gray} style={styles.iconStyles} />
                    <TextInput
                      placeholder='Enter last name'
                      onChangeText={handleChange('last_name')}
                      onBlur={handleBlur('last_name')}
                      value={values.last_name}
                      autoCapitalize='none'
                      autoCorrect={false}
                      style={{ flex: 1 }}
                    />
                  </View>
                  {touched.last_name && errors.last_name && <Text style={styles.errorMessage}>{errors.last_name}</Text>}
                </View>

                <View style={styles.wrapper}>
                  <Text style={styles.label}>Location</Text>
                  <View style={styles.inputWrapper(touched.location ? COLORS.secondary : COLORS.offwhite)}>
                    <EvilIcons name='location' size={20} color={COLORS.gray} style={styles.iconStyles} />
                    <TextInput
                      placeholder='Enter location'
                      onChangeText={handleChange('location')}
                      onBlur={handleBlur('location')}
                      value={values.location}
                      autoCapitalize='none'
                      autoCorrect={false}
                      style={{ flex: 1 }}
                    />
                  </View>
                  {touched.location && errors.location && <Text style={styles.errorMessage}>{errors.location}</Text>}
                </View>

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
                      secureTextEntry={obscureText}
                      placeholder='Enter password'
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                      autoCapitalize='none'
                      autoCorrect={false}
                      style={{ flex: 1 }}
                    />
                    <TouchableOpacity onPress={() => setObscureText(!obscureText)}>
                      <MaterialCommunityIcons name={obscureText ? 'eye-outline' : 'eye-off-outline'} size={18} />
                    </TouchableOpacity>
                  </View>
                  {touched.password && errors.password && <Text style={styles.errorMessage}>{errors.password}</Text>}
                </View>

                <Button
                  loader={loader}
                  title='REGISTER'
                  onPress={handleSubmit}
                  isValid={isValid}
                />

                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text style={styles.register}>Login</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

export default Register;
