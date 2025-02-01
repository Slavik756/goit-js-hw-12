
export async function renderGallery(images) {
    const galleryContainer = document.querySelector('.gallery');
  
    const markup = images
      .map(image => {
        return `  <li class="gallery-item">
            <a href="${image.largeImageURL}">
              <img src="${image.webformatURL}" alt="${image.tags}" height="152" width="360"/>
            </a>
            <ul class="info">
             <li>
               <p class="headers">Likes</p>
               <p class="details">${image.likes}</p>
             </li>
             <li>
               <p class="headers">Views</p>
               <p class="details">${image.views}</p>
             </li>
             <li>
               <p class="headers">Comments</p>
               <p class="details">${image.comments}</p>
             </li>
             <li>
               <p class="headers">Downloads</p>
               <p class="details">${image.downloads}</p>
             </li>
            </ul>
          </li>`;
      })
      .join('');
    galleryContainer.insertAdjacentHTML('beforeend', markup);
  }
  
  export function clearGallery() {
    const galleryContainer = document.querySelector('.gallery');
    galleryContainer.innerHTML = '';
  }