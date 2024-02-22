import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons, EvilIcons, MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import styles from './addItem.style';
import { BackButton, Button, DispositionPicker, OwnerShipPicker, SentimentalPicker, CategoryPicker } from '../components';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { COLORS } from '../constants';
import { rootUrl } from '../hook/rootUrl';

const validationSchema = Yup.object().shape({
  name: Yup.string().min(4, 'Item name must be at least 4 characters long').required('Required'),
  description: Yup.string().min(10, 'Item description must be at least 10 characters long').required('Required'),
  sentimental_value: Yup.number().min(0, 'Sentimental value must be a positive number').max(5, 'Sentimental value must be less than or equal to 5').required('Required'),
  monetary_value: Yup.number().min(0, 'Monetary value must be a positive number').required('Required'),
  location: Yup.string().min(6, 'Location must be at least 6 characters long').required('Required'),
  ownership_status: Yup.string().min(4, 'Ownership status must be at least 4 characters long').required('Required'),
  desired_disposition: Yup.string().required('Required'),
  category: Yup.number().required('Required'),
});

const AddItem = () => {
  const navigation = useNavigation();
  const [loader, setLoader] = useState(false);
  const [images, setImages] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('accessToken');

        const response = await axios.get(`${rootUrl}users/user-details/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });

        const userIdFromApi = response.data.id;
        setUserId(userIdFromApi);
      } catch (error) {
        console.error('Error fetching user ID:', error);
      }
    };

    fetchUserId();
  }, []);

  const endpoint = `${rootUrl}items/`;

  const handleAddItem = async (values) => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (!accessToken) {
      navigation.navigate('Login');
      return;
    }

    setLoader(true);

    try {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value);
      });

      // Add userId to formData
      formData.append('user', userId);

      const headers = new Headers();
      headers.append('Authorization', `Bearer ${accessToken}`);

      const requestOptions = {
        method: 'POST',
        headers: headers,
        body: formData,
        redirect: 'follow',
      };

      const response = await fetch(endpoint, requestOptions);
      const responseData = await response.json();

      if (response.status === 201) {
        navigation.goBack();
      } else {
        Alert.alert('Error', 'Invalid data. Please try again.');
      }
    } catch (error) {
      console.error('Error adding item:', error);
      Alert.alert(
        'Error',
        'An error occurred while adding the item. Please try again later.'
      );
    } finally {
      setLoader(false);
    }
  };

  // const handleImageSelection = () => {
  //   const options = {
  //     mediaType: 'photo',
  //     quality: 0.5,
  //   };

  //   try {
  //     launchImageLibrary(options, (response) => {
  //       if (response.didCancel) {
  //         console.log('User cancelled image picker');
  //       } else if (response.error) {
  //         console.log('ImagePicker Error: ', response.error);
  //       } else {
  //         const uri = response.uri;
  //         const newImage = { uri: uri };
  //         setImages([...images, newImage]);
  //       }
  //     });
  //   } catch (error) {
  //     console.error('Error selecting image:', error);
  //     Alert.alert('Error', 'An error occurred while selecting the image. Please try again.');
  //   }
  // };

  return (
    <ScrollView>
      <SafeAreaView style={{ marginHorizontal: 12 }}>
        <View style={styles.container}>
          <BackButton onPress={() => navigation.goBack()} />
          <Text style={styles.title}>Add Item</Text>

          <Formik
            initialValues={{
              name: '',
              description: '',
              sentimental_value: '',
              monetary_value: '',
              location: '',
              desired_disposition: '',
              ownership_status: '',
              category: '',
              images: [],
            }}
            validationSchema={validationSchema}
            onSubmit={handleAddItem}
          >
            {({ handleChange, handleBlur, touched, handleSubmit, values, errors, isValid }) => (
              <View>
                <View style={styles.wrapper}>
                  <Text style={styles.label}>Name</Text>
                  <View style={styles.inputWrapper(touched.name ? COLORS.secondary : COLORS.offwhite)}>
                    <MaterialCommunityIcons name='rename-box' size={20} color={COLORS.gray} style={styles.iconStyles} />
                    <TextInput
                      placeholder='Enter item name'
                      onChangeText={handleChange('name')}
                      onBlur={handleBlur('name')}
                      value={values.name}
                      autoCapitalize='none'
                      autoCorrect={false}
                      style={{ flex: 1 }}
                    />
                  </View>
                  {touched.name && errors.name && <Text style={styles.errorMessage}>{errors.name}</Text>}
                </View>

                <View style={styles.wrapper}>
                  <Text style={styles.label}>Description</Text>
                  <View style={styles.inputWrapper(touched.description ? COLORS.secondary : COLORS.offwhite)}>
                    <MaterialIcons name='description' size={20} color={COLORS.gray} style={styles.iconStyles} />
                    <TextInput
                      placeholder='Enter description'
                      onChangeText={handleChange('description')}
                      onBlur={handleBlur('description')}
                      value={values.description}
                      numberOfLines={4}
                      autoCapitalize='none'
                      autoCorrect={false}
                      style={{ flex: 1, minHeight: 100 }}
                    />
                  </View>
                  {touched.description && errors.description && <Text style={styles.errorMessage}>{errors.description}</Text>}
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
                  <Text style={styles.label}>Monetary Value</Text>
                  <View style={styles.inputWrapper(touched.monetary_value ? COLORS.secondary : COLORS.offwhite)}>
                    <MaterialIcons name='attach-money' size={20} color={COLORS.gray} style={styles.iconStyles} />
                    <TextInput
                      placeholder='Enter monetary value'
                      onChangeText={handleChange('monetary_value')}
                      onBlur={handleBlur('monetary_value')}
                      value={values.monetary_value}
                      autoCapitalize='none'
                      autoCorrect={false}
                      style={{ flex: 1 }}
                    />
                  </View>
                  {touched.monetary_value && errors.monetary_value && <Text style={styles.errorMessage}>{errors.monetary_value}</Text>}
                </View>

                <View style={styles.wrapper}>
                  <Text style={styles.label}>Select Sentimental Value (1 Lowest - 5 Highest)</Text>
                  <SentimentalPicker
                    value={values.sentimental_value}
                    onChange={(value) => handleChange('sentimental_value')(value)}
                  />
                  {touched.sentimental_value && errors.sentimental_value && <Text style={styles.errorMessage}>{errors.sentimental_value}</Text>}
                </View>

                <View style={styles.wrapper}>
                  <Text style={styles.label}>Select Ownership Status</Text>
                  <OwnerShipPicker
                    value={values.ownership_status}
                    onChange={(value) => handleChange('ownership_status')(value)}
                  />
                  {touched.ownership_status && errors.ownership_status && <Text style={styles.errorMessage}>{errors.ownership_status}</Text>}
                </View>

                <View style={styles.wrapper}>
                  <Text style={styles.label}>Select Desired Disposition</Text>
                  <DispositionPicker
                    value={values.desired_disposition}
                    onChange={(value) => handleChange('desired_disposition')(value)}
                  />
                  {touched.desired_disposition && errors.desired_disposition && <Text style={styles.errorMessage}>{errors.desired_disposition}</Text>}
                </View>

                <View style={styles.wrapper}>
                  <Text style={styles.label}>Select Category</Text>
                  <CategoryPicker
                    value={values.category}
                    onChange={(value) => handleChange('category')(value)}
                  />
                  {touched.category && errors.category && <Text style={styles.errorMessage}>{errors.category}</Text>}
                </View>

                <View style={styles.wrapper}>
                  <Text style={styles.label}>Upload Images</Text>
                  <View style={styles.inputWrapper(touched.category ? COLORS.secondary : COLORS.offwhite)}>
                    <TouchableOpacity onPress={() => {}}>
                      <MaterialIcons name="cloud-upload" size={24} color="black" />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.imagePreviewContainer}>
                    {images.map((image, index) => (
                      <Image key={index} source={{ uri: image.uri }} style={styles.imagePreview} />
                    ))}
                  </View>
                </View>

                <Button
                  loader={loader}
                  title='Submit'
                  onPress={handleSubmit}
                  isValid={isValid}
                />
              </View>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

export default AddItem
