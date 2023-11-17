import { PhotoAPI } from './settengAPI';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  form: document.querySelector(`#search-form`),
  divElem: document.querySelector(`.gallery`),
  btnSearch: document.querySelector(`.load-more`),
};
refs.btnSearch.disabled = true;
refs.form.addEventListener('submit', onformElemSubmit);
refs.btnSearch.addEventListener(`click`, onbtnSearchClick);
let lightbox = new SimpleLightbox('.gallery a');
const photosAPI = new PhotoAPI();

async function onformElemSubmit(e) {
  e.preventDefault();

  const formElem = e.target.elements.searchQuery.value;

  photosAPI.q = formElem;

  photosAPI.page = 1;

  try {
    const res = await photosAPI.fetchPhoto();
    photosAPI.totalPage = Math.ceil(res.totalHits / PhotoAPI.PER_PAGE);

    refs.divElem.innerHTML = '';

    renderTemplate(res.hits);

    refs.btnSearch.disabled = false;

    updateStatusLoadMore();
  } catch (error) {
    console.error('Error fetching photos:', error);
  }
}

function photoTemplate(photo) {
  const {
    webformatURL,
    largeImageURL,
    tags,
    likes,
    views,
    comments,
    downloads,
  } = photo;

  return `<a href="${largeImageURL}"><div class="photo-link">
            <img class="photo" src="${webformatURL}" alt="${tags}" loading="lazy" />
            <div class="photo-info">
              <p class="photo-p">
                <b>Likes</b>
                <span>${likes}</span>
              </p>
              <p class="photo-p">
                <b>Views</b>
                <span>${views}</span>
              </p>
              <p class="photo-p">
                <b>Comments</b>
                <span>${comments}</span>
              </p>
              <p class="photo-p">
                <b>Downloads</b>
                <span>${downloads}</span>
              </p>
            </div>
          </div></a>`;
}

function photosTemplate(photo) {
  const template = photo.map(photoTemplate).join('');
  return template;
}

function renderTemplate(photo) {
  const photoMarkup = photosTemplate(photo);

  refs.divElem.insertAdjacentHTML('beforeend', photoMarkup);
  lightbox.refresh();
}

async function onbtnSearchClick(photo) {
  photosAPI.page += 1;
  try {
    const res = await photosAPI.fetchPhoto();
    renderTemplate(res.hits);
    updateStatusLoadMore();
  } catch (error) {
    console.error('Error fetching more photos:', error);
  }
}

function updateStatusLoadMore() {
  refs.btnSearch.disabled = photosAPI.page >= photosAPI.totalPage;
  console.log(photosAPI.page);
  console.log(photosAPI.totalPage);
}

function showLoader() {
  btnSearch.classList.add('load-more');
}

function hideLoader() {
  btnSearch.classList.remove('load-more');
}
console.log();
// // import '../src/settengAPI';
// import { PhotoAPI } from './settengAPI';
// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';

// const refs = {
//   form: document.querySelector(`#search-form`),
//   divElem: document.querySelector(`.gallery`),
//   btnSearch: document.querySelector(`.load-more`),
// };
// refs.btnSearch.disabled = true;
// refs.form.addEventListener('submit', onformElemSubmit);
// refs.btnSearch.addEventListener(`click`, onbtnSearchClick);

// const photosAPI = new PhotoAPI();

// async function onformElemSubmit(e) {
//   e.preventDefault();

//   const formElem = e.target.elements.searchQuery.value;

//   photosAPI.q = formElem;

//   photosAPI.page = 1;

//   photosAPI.fetchPhoto().then(res => {
//     photosAPI.totalPage = Math.ceil(res.totalHits / photosAPI.PER_PAGE);

//     refs.divElem.innerHTML = '';

//     renderTemplate(res.hits);

//     lightbox = new SimpleLightbox('.gallery a');

//     refs.btnSearch.disabled = false;

//     updateStatusLoadMore();
//   });
// }

// function photoTemplate(photo) {
//   const {
//     webformatURL,
//     largeImageURL,
//     tags,
//     likes,
//     views,
//     comments,
//     downloads,
//   } = photo;

//   return `<a href="${largeImageURL}"><div class="photo-card">
//             <img src="${webformatURL}" alt="${tags}" loading="lazy" />
//             <div class="info">
//               <p class="info-item">
//                 <b>Likes</b>
//                 <span>${likes}</span>
//               </p>
//               <p class="info-item">
//                 <b>Views</b>
//                 <span>${views}</span>
//               </p>
//               <p class="info-item">
//                 <b>Comments</b>
//                 <span>${comments}</span>
//               </p>
//               <p class="info-item">
//                 <b>Downloads</b>
//                 <span>${downloads}</span>
//               </p>
//             </div>
//           </div></a>`;
// }

// function photosTemplate(photo) {
//   const template = photo.map(photoTemplate).join('');
//   return template;
// }
// function renderTemplate(photo) {
//   const photoMarkup = photosTemplate(photo);
//   // refs.divElem.innerHTML = photoMarkup;
//   refs.divElem.insertAdjacentHTML('beforeend', photoMarkup);
// }
// function onbtnSearchClick(photo) {
//   photosAPI.page += 1;
//   photosAPI.fetchPhoto().then(res => renderTemplate(res.hits));
//   updateStatusLoadMore();
// }

// function updateStatusLoadMore() {
//   refs.btnSearch.disabled = photosAPI.page >= PhotoAPI.totalPage;
// }
