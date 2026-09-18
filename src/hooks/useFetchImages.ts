import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchImages } from '../api/picsumApi';
import { GalleryImage } from '../types/gallery';

export const useFetchImages = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const loadingRef = useRef(false);

  const loadImages = useCallback(async (page: number = 1) => {
  if (loadingRef.current) {
    return;
  }

  loadingRef.current = true;

  try {
    setLoading(true);
    setError('');

    const data = await fetchImages(page, 50);
    setPage(page);

    setImages((previous) =>
      page === 1 ? data : [...previous, ...data],
    );
  } catch (err) {
    setError('Failed to load images. Please try again.');
  } finally {
    loadingRef.current = false;
    setLoading(false);
  }
}, []);

  const refresh = useCallback(async () => {
    try {
      setRefreshing(true);
      setError('');

      const data = await fetchImages(1, 50);
      setImages(data);
      setPage(1);
    } catch (err) {
      setError('Failed to refresh images.');
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadImages(1);
  }, [loadImages]);

  return {
    images,
    loading,
    refreshing,
    error,
    loadMore: () => loadImages(page + 1),
    refresh,
  };
};