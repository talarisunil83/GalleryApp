import React, { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import ImageCard from '../../components/ImageCard';
import { useFetchImages } from '../../hooks/useFetchImages';
import { useDebounce } from '../../hooks/useDebounce';
import { useGalleryStore } from '../../store/useGalleryStore';

export default function HomeScreen() {
  const navigation = useNavigation<any>();

  const {
    images,
    loading,
    refreshing,
    error,
    loadMore,
    refresh,
  } = useFetchImages();

  const toggleFavorite = useGalleryStore(
    (state) => state.toggleFavorite,
  );

  const isFavorite = useGalleryStore(
    (state) => state.isFavorite,
  );

  const loadFavorites = useGalleryStore(
    (state) => state.loadFavorites,
  );

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const debouncedSearch = useDebounce(search, 300);

  const filteredImages = useMemo(() => {
    return images.filter((image) => {
      const author = image.author.toLowerCase();

      const searchMatch = author.includes(
        debouncedSearch.toLowerCase(),
      );

      if (filter === 'A-M') {
        return (
          searchMatch &&
          author.charAt(0) >= 'a' &&
          author.charAt(0) <= 'm'
        );
      }

      if (filter === 'N-Z') {
        return (
          searchMatch &&
          author.charAt(0) >= 'n' &&
          author.charAt(0) <= 'z'
        );
      }

      return searchMatch;
    });
  }, [images, debouncedSearch, filter]);

  if (loading && images.length === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading images...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gallery</Text>

      <TextInput
        style={styles.search}
        placeholder="Search by author"
        value={search}
        onChangeText={setSearch}
      />

      <View style={styles.filters}>
        {['All', 'A-M', 'N-Z'].map((item) => (
          <Pressable
            key={item}
            style={[
              styles.filterButton,
              filter === item && styles.activeFilter,
            ]}
            onPress={() => setFilter(item)}
          >
            <Text
              style={[
                styles.filterText,
                filter === item && styles.activeFilterText,
              ]}
            >
              {item}
            </Text>
          </Pressable>
        ))}
      </View>

      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : null}

      <FlatList
        data={filteredImages}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <ImageCard
            image={item}
            favorite={isFavorite(item.id)}
            onFavorite={() => toggleFavorite(item)}
            onPress={() =>
              navigation.navigate('ImageDetail', {
                image: item,
              })
            }
          />
        )}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        refreshing={refreshing}
        onRefresh={refresh}
        ListEmptyComponent={
          <Text style={styles.empty}>
            {debouncedSearch || filter !== 'All'
              ? 'No images found.'
              : 'No images available.'}
          </Text>
        }
        ListFooterComponent={
          loading ? (
            <ActivityIndicator style={styles.loader} />
          ) : null
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

  filters: {
    flexDirection: 'row',
    marginBottom: 10,
  },

  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 20,
    marginRight: 8,
  },

  activeFilter: {
    backgroundColor: '#222222',
  },

  filterText: {
    fontWeight: '600',
  },

  activeFilterText: {
    color: '#ffffff',
  },

  error: {
    color: '#d32f2f',
    marginBottom: 8,
  },

  loader: {
    marginVertical: 20,
  },

  empty: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
});