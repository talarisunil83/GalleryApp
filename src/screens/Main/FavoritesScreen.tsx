import React, { useEffect, useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import ImageCard from '../../components/ImageCard';
import { useGalleryStore } from '../../store/useGalleryStore';

export default function FavoritesScreen() {
    const navigation = useNavigation<any>();
  const favorites = useGalleryStore((state) => state.favorites);
  const loadFavorites = useGalleryStore((state) => state.loadFavorites);
  const toggleFavorite = useGalleryStore(
    (state) => state.toggleFavorite,
  );

  const [search, setSearch] = useState('');

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  const filteredFavorites = useMemo(() => {
    return favorites.filter((image) =>
      image.author.toLowerCase().includes(search.toLowerCase()),
    );
  }, [favorites, search]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorites</Text>

      <TextInput
        style={styles.search}
        placeholder="Search favorites by author"
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={filteredFavorites}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <ImageCard
            image={item}
            favorite={true}
            onFavorite={() => {
  Alert.alert(
    'Remove Favorite',
    'Remove this image from favorites?',
    [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Remove',
        style: 'destructive',
        onPress: () => toggleFavorite(item),
      },
    ],
  );
}}
            onPress={() =>
  navigation.navigate('ImageDetail', {
    image: item,
  })
}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>
            No favorite images found.
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 10,
  },
  search: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
  },
  empty: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
  },
});