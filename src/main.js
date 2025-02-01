// У файлі main.js напиши всю логіку роботи додатка.

import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { fetchImages } from './js/pixabay-api';
import { renderGallery, clearGallery } from './js/render-functions';

const form = document.querySelector('.search-form');
const galleryContainer = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.btn-load');
const loader = document.querySelector('.loader');

let lightbox = new SimpleLightbox('.gallery a');
let page = 1;
let perPage = 15;
let query = '';

form.addEventListener('submit', async event => {
  event.preventDefault();
  query = event.target.elements.query.value.trim();

  if (query === '') {
    iziToast.error({
      message: 'Please enter a search term',
      position: 'topRight',
    });
    return;
  }

  clearGallery();
  lightbox.refresh();
  page = 1;
  event.target.elements.query.value = '';
  loadMoreBtn.style.display = 'none';

  const loaderSearch = document.querySelector('.loader-search');
  loaderSearch.style.display = 'block';

  try {
    const { hits, totalHits } = await fetchImages(query, page);

    loaderSearch.style.display = 'none';
    if (!hits || hits.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
    } else {
      renderGallery(hits);
      lightbox.refresh();
      loadMoreBtn.style.display = 'block';

      if (hits.length < perPage || hits.length >= totalHits) {
        loadMoreBtn.style.display = 'none';
        iziToast.info({
          message: "We're sorry, but you've reached the end of search results.",
          position: 'topRight',
        });
      }
    }
  } catch (error) {
    loaderSearch.style.display = 'none';
    iziToast.error({ title: 'Error', message: 'Failed to fetch images' });
  }
});

loadMoreBtn.addEventListener('click', async () => {
  const loaderLoad = document.querySelector('.loader-load');
  loaderLoad.style.display = 'block';

  page += 1;

  try {
    const { hits, totalHits } = await fetchImages(query, page, perPage);

    loaderLoad.style.display = 'none';
    renderGallery(hits);
    lightbox.refresh();

    if (hits.length > 0) {
      const galleryItem = document.querySelector('.gallery .gallery-item');
      if (galleryItem) {
        const { height: cardHeight } = galleryItem.getBoundingClientRect();
        window.scrollBy({
          top: cardHeight * 2,
          behavior: 'smooth',
        });
      }
    }

    if (hits.length === 0 || page * perPage >= totalHits) {
      loadMoreBtn.style.display = 'none';
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    } else {
      loadMoreBtn.textContent = 'Load more';
    }
  } catch (error) {
    console.log(error);
    loaderLoad.style.display = 'none';
  }
});
