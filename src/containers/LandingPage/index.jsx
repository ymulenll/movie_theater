import React, { useState, memo, useEffect } from 'react';
import { get } from '../../utils/apiClient';
import Loader from '../../components/Loader';
import Search from '../../components/Search';
import Rating from '../../components/Rating';
import Header from '../../components/Header';
import MoviesGrid from '../../components/MoviesGrid';
import InfiniteScroll from 'react-infinite-scroll-component';

const LandingPage = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [stars, setStars] = useState(0);
  const [loading, setLoading] = useState(false);

  const onChangeStars = starPosition => {
    const newStars = starPosition === stars ? 0 : starPosition;
    setStars(newStars);
  };

  const onSetSearch = newSearch => {
    setPage(1);
    setSearch(newSearch);
  };

  const incrementPage = () => setPage(p => p + 1);

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      let fetchedMovies;
      if (search) {
        fetchedMovies = await get(`search/movie?query=${search}&page=${page}`);
      } else {
        fetchedMovies = await get(`discover/movie?page=${page}`);
      }

      if (page > 1) {
        setMovies(m => [...m, ...fetchedMovies.results]);
      } else {
        setMovies(fetchedMovies.results);
      }
      setHasMore(fetchedMovies.page < fetchedMovies.total_pages);
      setLoading(false);
    };
    getMovies();
  }, [page, search]);

  return (
    <div>
      <Header />
      <Search search={search} setSearch={onSetSearch} />
      <Rating stars={stars} onChangeStars={onChangeStars} />
      <InfiniteScroll
        dataLength={movies.length}
        next={incrementPage}
        hasMore={hasMore && stars === 0}
        loader={<Loader key={movies.length} />}
      >
        <MoviesGrid movies={movies} stars={stars} loading={loading} />
      </InfiniteScroll>
    </div>
  );
};

export default memo(LandingPage);
