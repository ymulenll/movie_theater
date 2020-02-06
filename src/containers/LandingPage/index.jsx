import React, { useEffect, useState, memo } from 'react';
import { get } from '../../utils/apiClient';
import styles from './LandingPage.module.css';
import Loader from '../../components/Loader';
import placeholder from '../../placeholder.jpg';
import Search from '../../components/Search';
import Rating from '../../components/Rating';

const LandingPage = () => {
  const [search, setSearch] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stars, setStars] = useState(0);
  const onChangeStars = starPosition => {
    const newStars = starPosition === stars ? 0 : starPosition;
    setStars(newStars);
  };

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);

      let fetchedMovies;
      if (search) {
        fetchedMovies = await get(`search/movie?query=${search}`);
      } else {
        fetchedMovies = await get('discover/movie');
      }
      setMovies(fetchedMovies.results);
      setLoading(false);
    };
    getMovies();
  }, [search]);

  const filterByStars = ({ vote_average }) =>
    stars === 0 || (stars * 2 > vote_average && stars * 2 - 2 <= vote_average);

  return (
    <div>
      <h1 className={styles.header}>FILMIX Theather</h1>
      <Search search={search} setSearch={setSearch} />
      <Rating stars={stars} onChangeStars={onChangeStars} />
      {loading && <Loader />}
      {!loading && (
        <div className={styles.gridContainer}>
          {movies.filter(filterByStars).map(movie => (
            <div key={movie.id} className={styles.gridItem}>
              <img
                width='100%'
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                    : placeholder
                }
                alt={movie.title}
                className={styles.image}
              />
              <div>{movie.title}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default memo(LandingPage);
