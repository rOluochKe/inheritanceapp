import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ActivityIndicator, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import styles from './itemDetail.style';
import { COLORS } from '../constants';
import { rootUrl } from '../hook/rootUrl';

const ItemDetail = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { item } = route.params;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);
  const [itemDetail, setItemDetail] = useState(null);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        if (!accessToken) {
          Alert.alert('Login Required', 'Please log in to view this item.', [
            { text: 'OK', onPress: () => navigation.navigate('Login') }
          ]);
        } else {
          setToken(accessToken);
        }
      } catch (error) {
        console.error('Error fetching token:', error);
        setError('An error occurred while fetching token.');
      } finally {
        setLoading(false);
      }
    };

    fetchToken();
  }, [navigation]);

  useEffect(() => {
    const fetchItemDetail = async () => {
      if (!token) {
        navigation.navigate('Login');
        return;
      }

      setLoading(true);
      try {
        const response = await axios.get(`${rootUrl}items/${item.id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setItemDetail(response.data);

        const responseUser = await axios.get(`${rootUrl}users/user-details/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setIsOwner(responseUser.data.id === response.data.user);
      } catch (error) {
        console.error('Error fetching item detail:', error);
        setError('An error occurred while fetching item detail.');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchItemDetail();
    }
  }, [token, item.id, navigation]);

  const handleDeleteItem = async () => {
    try {
      await axios.delete(`${rootUrl}items/${item.id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigation.navigate('ItemList');
    } catch (error) {
      console.error('Error deleting item:', error);
      Alert.alert('Delete Failed', 'An error occurred while deleting the item.');
    }
  };

  const confirmDeleteItem = () => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this item?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', onPress: handleDeleteItem }
      ],
      { cancelable: true }
    );
  };

  if (loading) {
    return <ActivityIndicator size="large" color={COLORS.primary} />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  if (!itemDetail) {
    return null;
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <View style={styles.upperRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name='chevron-back-circle' size={30} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Ionicons name='heart' size={30} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        <Image
          source={
            itemDetail.images.length > 0 && itemDetail.images[0].image
            ? { uri: itemDetail.images[0].image }
            : require('../assets/images/fn3.jpg')
          }
          style={styles.image}
        />

        <View style={styles.details}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{itemDetail.name}</Text>
            <View style={styles.valueWrapper}>
              <Text style={styles.value}>${itemDetail.monetary_value}</Text>
            </View>
          </View>
          <View style={styles.ratingRow}>
            <View style={styles.rating}>
              <Text style={styles.ratingText}>Ownership Status: </Text>
              <Text style={styles.ratingText}>{itemDetail.ownership_status}</Text>
            </View>
          </View>
          <View style={styles.ratingRow}>
            <View style={styles.rating}>
              <Text style={styles.ratingText}>Sentimental Value:</Text>
              <Text style={styles.ratingText}>{itemDetail.sentimental_value} (1 Lowest - 5 Highest)</Text>
            </View>
          </View>
          <View style={styles.descriptionWrapper}>
            <Text style={styles.description}>Description</Text>
            <Text style={styles.descText}>{itemDetail.description}</Text>
          </View>
          <View style={{ marginBottom: 20 }}>
            <View style={styles.location}>
              <View style={{ flexDirection: 'row' }}>
                <Ionicons name='location-outline' size={20} />
                <Text>{itemDetail.location}</Text>
              </View>
            </View>
          </View>

          {isOwner && (
            <View style={styles.requestItemRow}>
              <TouchableOpacity onPress={() => navigation.navigate('EditDetail', { item: itemDetail })} style={styles.editBtn}>
                <Text style={styles.requestItemTitle}>Edit Item</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={confirmDeleteItem} style={styles.deleteBtn}>
                <Text style={styles.requestItemTitle}>Delete Item</Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.requestItemRow}>
            <TouchableOpacity onPress={() => {}} style={styles.requestBtn}>
              <Text style={styles.requestItemTitle}>Request Item</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ItemDetail;
