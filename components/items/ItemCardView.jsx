import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Octicons } from '@expo/vector-icons';
import styles from './itemCardView.style'
import { COLORS } from '../../constants';
import { useNavigation } from '@react-navigation/native';

const ItemCardView = ({ item }) => {
  const navigation = useNavigation()

  // Check if item.images exists and has at least one element
  const imageUrl = item.images && item.images.length > 0 && item.images[0].image;

  return (
    <TouchableOpacity onPress={() => navigation.navigate('ItemDetail', {item})}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          {imageUrl && (
            <Image
              source={{ uri: imageUrl }}
              style={styles.image}
            />
          )}
          {!imageUrl && (
            <Image
              source={require('../../assets/images/fn3.jpg')}
              style={styles.image}
            />
          )}
        </View>

        <View style={styles.details}>
          <Text style={styles.title} numberOfLines={1}>{item.name}</Text>
          <Text style={styles.owner} numberOfLines={1}>{item.ownership_status}</Text>
          <Text style={styles.value}>${item.monetary_value}</Text>
        </View>

        <TouchableOpacity style={styles.addBtn}>
          <Octicons name='eye' size={25} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )
}

export default ItemCardView