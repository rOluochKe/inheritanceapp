import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons, EvilIcons, MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import styles from './edit.style';
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

const EditDetail = ({ navigation }) => {
  const { item } = useRoute().params;
  const [loader, setLoader] = useState(false);
  const [images, setImages] = useState(item.images);

  const endpoint = `${rootUrl}items/${item.id}/`;

  const handleEditItem = async (values) => {
    setLoader(true);

    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (!accessToken) {
        navigation.navigate('Login');
        return;
      }

      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('description', values.description);
      formData.append('sentimental_value', values.sentimental_value);
      formData.append('monetary_value', values.monetary_value);
      formData.append('location', values.location);
      formData.append('ownership_status', values.ownership_status);
      formData.append('desired_disposition', values.desired_disposition);
      formData.append('category', values.category);
      formData.append('user', values.user);
      values.images.forEach((image, index) => {
        formData.append(`image${index + 1}`, {
          uri: image.uri,
          name: `image${index + 1}.jpg`,
          type: 'image/jpeg',
        });
      });

      const response = await axios.put(endpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (response.status === 200) {
        navigation.navigate('ItemList');
      } else {
        Alert.alert('Error', 'Invalid data. Please try again.');
      }
    } catch (error) {
      console.error('Error editing item:', error);
      Alert.alert('Error', 'An error occurred while editing the item. Please try again later.');
    } finally {
      setLoader(false);
    }
  };

  // const handleImageSelection = () => {
  //   const options = {
  //     mediaType: 'photo',
  //     quality: 0.5,
  //   };

  //   launchImageLibrary(options, (response) => {
  //     if (response.didCancel) {
  //       console.log('User cancelled image picker');
  //     } else if (response.error) {
  //       console.log('ImagePicker Error: ', response.error);
  //     } else {
  //       const uri = response.uri;
  //       const newImage = { uri: uri };
  //       setImages([...images, newImage]);
  //     }
  //   });
  // };

  return (
    <ScrollView>
      <SafeAreaView style={{ marginHorizontal: 12 }}>
        <View>
          <BackButton onPress={() => navigation.goBack()} />
          <Text style={styles.title}>Edit Item Details</Text>

          <Formik
            initialValues={{
              name: item.name,
              description: item.description,
              sentimental_value: String(item.sentimental_value),
              monetary_value: item.monetary_value,
              location: item.location,
              desired_disposition: item.desired_disposition,
              ownership_status: item.ownership_status,
              category: String(item.category),
              user: String(item.user),
              images: item.images,
            }}
            validationSchema={validationSchema}
            onSubmit={handleEditItem}
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

export default EditDetail