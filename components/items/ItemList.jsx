import { View, FlatList, ActivityIndicator, SafeAreaView } from 'react-native'
import React from 'react'
import styles from './itemList.style'
import useFetch from '../../hook/useFetch'
import { COLORS, SIZES } from '../../constants'
import ItemCardView from './ItemCardView'

const ItemList = () => {
  const { data, isLoading } = useFetch()

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={SIZES.xLarge} color={COLORS.primary} />
      </View>
    )
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <FlatList
          data={data}
          numColumns={2}
          renderItem={({ item }) => <ItemCardView item={item} />}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.container}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
    </SafeAreaView>
  )
}

export default ItemList