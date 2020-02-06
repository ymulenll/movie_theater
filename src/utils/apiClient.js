const headers = new Headers();

headers.append('Accept', 'application/json');
headers.append(
  'Authorization',
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NzUzN2ZmMTlmMzgxZGQ3YjY3ZWVlMWVhOGI4MTY0YSIsInN1YiI6IjVlM2ExNmU1MGMyNzEwMDAxODc1NTI4MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nOpZ_nBtA93tbzr6-rxD0760tssAAaSppyjRv9anArs',
);

const requestOptions = {
  method: 'GET',
  headers,
};

const API_URL = 'https://api.themoviedb.org/3/';

export const get = url =>
  fetch(`${API_URL}${url}`, requestOptions).then(result => result.json());
