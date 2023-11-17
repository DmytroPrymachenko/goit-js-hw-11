// import '../src/settengAPI';
import { photoAPI } from './settengAPI';

const refs = {
  form: document.querySelector(`.search-form`),
  divElem: document.querySelector(`.gallery`),
  btnSearch: document.querySelector(`.button-Search`),
};

refs.form.addEventListener('submit', onformElem);
refs.btnSearch.addEventListener(`click`, onbtnSearchElem);

function onformElem(e) {
  e.preventDefault();
  const formElem = e.target.elements.searchQuery.value;
  console.log(formElem);
}

function photoTemplate() {
  return `<div class="image-container">
    <img 
      src="${hits.webformatURL}"
      alt="#"
      class="image"
    />`;
}

function photosTemplate(photo) {
  photo.map(photoTemplate).joim('');
}
function renderTemplate(photo) {
  const photoMarkap = photosTemplate(photo);
  refs.divElem.insertAdjacentHTML('afterbegin', photoMarkap);
}
