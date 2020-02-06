import React, { useEffect, useState, memo } from 'react';
import { get } from '../../utils/apiClient';
import Loader from '../../components/Loader';
import Search from '../../components/Search';
import Rating from '../../components/Rating';
import Header from '../../components/Header';
import MoviesGrid from '../../components/MoviesGrid';

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

  return (
    <div>
      <Header />
      <Search search={search} setSearch={setSearch} />
      <Rating stars={stars} onChangeStars={onChangeStars} />
      {loading && <Loader />}
      {!loading && <MoviesGrid movies={movies} stars={stars} />}
    </div>
  );
};

export default memo(LandingPage);
