import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import styles from './newRivals.style'
import { COLORS } from '../constants';
import { ItemList } from '../components';

const NewRivals = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.upperRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name='chevron-back-circle' size={30} color={COLORS.lightWhite} />
          </TouchableOpacity>

          <Text style={styles.heading}>Items</Text>
        </View>
        <ItemList />
      </View>
    </SafeAreaView>
  )
}

export default NewRivals