import placeholder from '../placeholder.jpg';
const IMAGES_BASE_URL = 'https://image.tmdb.org/t/p/w';
export default (path, width) =>
  path ? `${IMAGES_BASE_URL}${width}${path}` : placeholder;
