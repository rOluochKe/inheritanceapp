import React, { useState } from 'react'
import { View, TouchableOpacity, TextInput, FlatList, Image } from 'react-native'
import { Feather, Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import styles from './search.style';
import { SIZES, COLORS } from '../constants';
import { SearchTile } from '../components';
import { rootUrl } from '../hook/rootUrl';

const Search = () => {
  const [searchKey, setSearchKey] = useState('')
  const [searchResults, setSearchResults] = useState([])

  const handleSearch = async () => {
    try {
      const encodedSearchKey = encodeURIComponent(searchKey);
      const searchURL = `${rootUrl}items/search/${encodedSearchKey}`;
      const response = await axios.get(searchURL);
      setSearchResults(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <View style={styles.searchContainer}>
        <TouchableOpacity>
          <Ionicons name='camera-outline' size={SIZES.xLarge} style={styles.searchIcon} />
        </TouchableOpacity>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={searchKey}
            onChangeText={setSearchKey}
            placeholder='What are you looking for?'
          />
        </View>

        <View>
          <TouchableOpacity style={styles.searchBtn} onPress={() => handleSearch()}>
            <Feather name='search' size={24} color={COLORS.offwhite} />
          </TouchableOpacity>
        </View>
      </View>
      {searchResults.length === 0 ? (
        <View style={{flex: 1}}>
          <Image
            source={require('../assets/images/Pose23.png')}
            style={styles.searchImage}
          />
        </View>
      ) : (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => (<SearchTile item={item} />)}
          style={{marginHorizontal: 12}}
        />
      )}
    </View>
  )
}

export default Search
