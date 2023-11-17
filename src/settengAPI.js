import Notiflix from 'notiflix';
import axios from 'axios';

const axiosPhoto = axios.create({
  key: 
  baseURL: `https://pixabay.com/api/?key=40708287-91fb1ed28a9cbdffb99391946&${key}&image_type=photo&orientation=horizontal&safesearch=true`,
});

export class PhotoAPI {
  getPhotos() {
    axiosPhoto
      .get()
      .then(res => res.data)
      .catch(err => console.log(err));
  }
}
const photoAPI = new PhotoAPI();

photoAPI.getPhotos();
