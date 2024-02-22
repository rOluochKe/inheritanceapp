import { View, Text, Image } from 'react-native'
import React from 'react'
import styles from './searchTile.style'
import { useNavigation } from '@react-navigation/native'

const SearchTile = ({ item }) => {
  const navigation = useNavigation()

  return (
    <View>
      <TouchableOpacity style={styles.container}
        onPress={() => navigation.navigate('ItemDetail', {item})}>
        <View style={styles.image}>
          <Image source={{uri: item.imageUrl}} style={styles.ItemImage} />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemOwner}>{item.owner}</Text>
          <Text style={styles.itemOwner}>{item.value}</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default SearchTile