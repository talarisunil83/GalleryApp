import React, { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { GalleryImage } from '../types/gallery';

interface Props {
  image: GalleryImage;
  favorite: boolean;
  onPress: () => void;
  onFavorite: () => void;
}

export default function ImageCard({
  image,
  favorite,
  onPress,
  onFavorite,
}: Props) {
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <Pressable style={styles.card} onPress={onPress}>
      {imageLoading && (
        <ActivityIndicator style={styles.imageLoader} />
      )}

      <Image
        source={{ uri: image.download_url }}
        style={styles.image}
        resizeMode="cover"
        onLoadStart={() => setImageLoading(true)}
        onLoadEnd={() => setImageLoading(false)}
      />

      <View style={styles.info}>
        <Text style={styles.author} numberOfLines={1}>
          {image.author}
        </Text>

        <Pressable
          onPress={onFavorite}
          style={styles.favoriteButton}
        >
          <Text style={styles.favorite}>
            {favorite ? '♥' : '♡'}
          </Text>
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 5,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
  },

  image: {
    width: '100%',
    height: 180,
  },

  imageLoader: {
    position: 'absolute',
    top: 80,
    left: 0,
    right: 0,
    zIndex: 1,
  },

  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
  },

  author: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
  },

  favoriteButton: {
    padding: 4,
  },

  favorite: {
    fontSize: 24,
  },
});