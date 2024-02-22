import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import styles from './home.style';
import { Welcome, Carousel, Headings, ItemRow } from '../components';

const Home = () => {
  const navigation = useNavigation()

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.appBarWrapper}>
        <View style={styles.appBar}>
          <Ionicons name='location-outline' size={24} />

          <Text style={styles.location}>New York, USA</Text>

          <View style={{ alignItems: 'flex-end' }}>
            <TouchableOpacity onPress={() => navigation.navigate('ItemList')}>
              <MaterialCommunityIcons name='skew-more' size={24} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Welcome />
        <Carousel />
        <Headings />
        <ItemRow />
      </ScrollView>
    </View>
  )
}

export default Home