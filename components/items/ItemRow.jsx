import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import React from 'react';
import styles from './itemRow.style';
import { COLORS, SIZES } from '../../constants';
import ItemCardView from './ItemCardView';
import useFetch from '../../hook/useFetch';

const ItemRow = () => {
  const { data, isLoading, error } = useFetch();

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size={SIZES.xxLarge} color={COLORS.primary} />
      ) : error ? (
        <Text>Something went wrong</Text>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ItemCardView item={item} />}
          horizontal
          contentContainerStyle={{ paddingHorizontal: SIZES.small }}
        />
      )}
    </View>
  );
};

export default ItemRow;
