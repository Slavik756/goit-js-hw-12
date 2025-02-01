
import axios from 'axios';
const API_KEY = '46102534-3e9989b221503d0d2c214f5a1';
const BASE_URL = 'https://pixabay.com/api/';

export const fetchImages = async (query, page = 1, perPage = 15) => {
  try {
    const response = await axios.get(
      `${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw new Error(
      'Sorry, there are no images matching your search query. Please try again!'
    );
  }
};