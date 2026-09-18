import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GalleryImage } from '../types/gallery';

const FAVORITES_KEY = '@gallery_favorites';

interface GalleryState {
  favorites: GalleryImage[];
  loadFavorites: () => Promise<void>;
  toggleFavorite: (image: GalleryImage) => Promise<void>;
  isFavorite: (id: string) => boolean;
}

export const useGalleryStore = create<GalleryState>((set, get) => ({
  favorites: [],

  loadFavorites: async () => {
    const data = await AsyncStorage.getItem(FAVORITES_KEY);

    if (data) {
      set({
        favorites: JSON.parse(data) as GalleryImage[],
      });
    }
  },

  toggleFavorite: async (image) => {
    const currentFavorites = get().favorites;

    const exists = currentFavorites.some(
      (item) => item.id === image.id,
    );

    const updatedFavorites = exists
      ? currentFavorites.filter((item) => item.id !== image.id)
      : [...currentFavorites, image];

    await AsyncStorage.setItem(
      FAVORITES_KEY,
      JSON.stringify(updatedFavorites),
    );

    set({
      favorites: updatedFavorites,
    });
  },

  isFavorite: (id) => {
    return get().favorites.some((item) => item.id === id);
  },
}));