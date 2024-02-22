import { View, Text, ScrollView, Image, TouchableOpacity, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { AntDesign, SimpleLineIcons, Feather, FontAwesome5 } from '@expo/vector-icons'
import axios from 'axios';
import styles from './profile.style'
import { COLORS } from '../constants';
import { rootUrl } from '../hook/rootUrl';

const Profile = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [userLogin, setUserLogin] = useState(false);

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        if (token) {
          const response = await axios.get(`${rootUrl}users/user-details/`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setUserData(response.data);
          setUserLogin(true);
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    getUserDetails();
  }, []);

  const logout = async () => {
    try {
      // Clear the access token from AsyncStorage
      await AsyncStorage.removeItem('accessToken');
      // Redirect to the login screen
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error logging out:', error);
      Alert.alert(
        'Error',
        'An error occurred while logging out. Please try again.'
      );
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <StatusBar backgroundColor={COLORS.gray} />

        <View style={{width: '100%'}}>
          <Image
            source={userData?.profile_picture ? { uri: userData.profile_picture } : require('../assets/images/space.jpg')}
            style={styles.cover}
          />
        </View>

        <View style={styles.profileContainer}>
          <Image
            source={require('../assets/images/userDefault.png')}
            style={styles.profile}
          />
          <Text style={styles.name}>
            {userLogin ? userData?.name : 'Please login into your account'}
          </Text>
          {userLogin ? (
            <View style={styles.loginBtn}>
              <Text style={styles.menuText}>{userData?.email}</Text>
            </View>
          ) : (
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <View style={styles.loginBtn}>
                <Text style={styles.menuText}>LOGIN </Text>
              </View>
            </TouchableOpacity>
          )}

          {userLogin && (
            <View style={styles.menuWrapper}>
              <View style={styles.menuItem(0.2)}>
                <SimpleLineIcons
                  name='user'
                  size={24}
                  color={COLORS.primary}
                />
                <Text style={styles.menuText}>Name: {userData?.first_name} {userData?.last_name}</Text>
              </View>

              <View style={styles.menuItem(0.2)}>
                <SimpleLineIcons
                  name='location-pin'
                  size={24}
                  color={COLORS.primary}
                />
                <Text style={styles.menuText}>Location: {userData?.location}</Text>
              </View>

              <View style={styles.menuItem(0.2)}>
                <Feather
                  name='phone'
                  size={24}
                  color={COLORS.primary}
                />
                <Text style={styles.menuText}>Phone Number: {userData?.phone_number}</Text>
              </View>

              <View style={styles.menuItem(0.2)}>
                <FontAwesome5
                  name='birthday-cake'
                  size={24}
                  color={COLORS.primary}
                />
                <Text style={styles.menuText}>Date of Birth: {userData?.date_of_birth}</Text>
              </View>

              <View style={styles.horizontalLine} />

              <TouchableOpacity onPress={() => navigation.navigate('AddItem')}>
                <View style={styles.menuItem(0.2)}>
                  <AntDesign
                    name='addfile'
                    size={24}
                    color={COLORS.primary}
                  />
                  <Text style={styles.menuText}>Add Item</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('ItemList')}>
                <View style={styles.menuItem(0.2)}>
                  <AntDesign
                    name='home'
                    size={24}
                    color={COLORS.primary}
                  />
                  <Text style={styles.menuText}>View Items</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => {}}>
                <View style={styles.menuItem(0.2)}>
                  <AntDesign
                    name='edit'
                    size={24}
                    color={COLORS.primary}
                  />
                  <Text style={styles.menuText}>Edit Profile</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={logout}>
                <View style={styles.menuItem(0.2)}>
                  <AntDesign
                    name='logout'
                    size={24}
                    color={COLORS.primary}
                  />
                  <Text style={styles.menuText}>Logout</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  )
}

export default Profile;
