import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import { Feather, Ionicons } from '@expo/vector-icons';
import styles from './welcome.style'
import { COLORS, SIZES } from '../../constants'

const Welcome = () => {
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.welcomeTxt(COLORS.black, SIZES.xSmall)}>
          {" "}
          Find The Most
        </Text>
        <Text style={styles.welcomeTxt(COLORS.primary, 0)}>
          {" "}
          Items That Matters
        </Text>
      </View>

      <View style={styles.searchContainer}>
        <TouchableOpacity>
          <Feather name='search' size={24} style={styles.searchIcon} />
        </TouchableOpacity>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value=''
            onPressIn={() => {}}
            placeholder='What are you looking for?'
          />
        </View>

        <View>
          <TouchableOpacity style={styles.searchBtn}>
            <Ionicons name='camera-outline' size={SIZES.xLarge} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default Welcome