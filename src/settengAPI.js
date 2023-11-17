import Notiflix from 'notiflix';
import axios from 'axios';

export class PhotoAPI {
  static BASE_URL = 'https://pixabay.com';
  static API_KEY = '40708287-91fb1ed28a9cbdffb99391946';
  static END_POINT = '/api/';
  static PER_PAGE = 40;

  constructor() {
    this.q = '';
    this.page = 1;
    this.totalPage = 1;
  }

  async fetchPhoto() {
    const PARAMS = new URLSearchParams({
      key: PhotoAPI.API_KEY,
      q: this.q,
      page: this.page,
      per_page: PhotoAPI.PER_PAGE,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    });

    const url = `${PhotoAPI.BASE_URL}${PhotoAPI.END_POINT}?${PARAMS}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.log(err);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.log(err);
      throw error;
    }
  }
}

// import Notiflix from 'notiflix';
// import axios from 'axios';

// // const photoAPI = new PhotoAPI();
// export class PhotoAPI {
//   static BASE_URL = 'https://pixabay.com';
//   static API_KEY = '40708287-91fb1ed28a9cbdffb99391946';
//   static END_POINT = '/api/';
//   static PER_PAGE = 40;
//   constructor() {
//     this.q = '';
//     this.page = 1;
//     this.totalPage = 1;
//   }

//   async fetchPhoto() {
//     const PARAMS = new URLSearchParams({
//       key: PhotoAPI.API_KEY,
//       q: this.q,
//       page: this.page,
//       per_page: PhotoAPI.PER_PAGE,
//       image_type: 'photo',
//       orientation: 'horizontal',
//       safesearch: true,
//     });

//     const url = `${PhotoAPI.BASE_URL}${PhotoAPI.END_POINT}?${PARAMS}`;
//     const res =
//     return fetch(url).then(res => res.json());
//     // const res = await PhotoAPI.get(url);
//     // return res.data;
//   }
// }
