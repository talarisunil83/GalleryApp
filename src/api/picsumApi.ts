import axios from 'axios';
import { GalleryImage } from '../types/gallery';

const API_URL = 'https://picsum.photos/v2/list';

export const fetchImages = async (
  page: number = 1,
  limit: number = 20,
): Promise<GalleryImage[]> => {
  const response = await axios.get<GalleryImage[]>(API_URL, {
    params: {
      page,
      limit,
    },
  });

  return response.data;
};