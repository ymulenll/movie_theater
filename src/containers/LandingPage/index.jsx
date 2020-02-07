import React, { useState, memo, useEffect } from 'react';
import { get } from '../../utils/apiClient';
import Search from '../../components/Search';
import Rating from '../../components/Rating';
import Header from '../../components/Header';
import MoviesGrid from '../../components/MoviesGrid';
import InfiniteScroll from 'react-infinite-scroll-component';
import useDebounce from '../../utils/useDebounce';

const LandingPage = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [stars, setStars] = useState(0);
  const [loading, setLoading] = useState(false);
  const [debouncing, setDebouncing] = useState(false);
  const debouncedSearch = useDebounce(search, 300);

  const onChangeStars = starPosition => {
    const newStars = starPosition === stars ? 0 : starPosition;
    setStars(newStars);
  };

  const onSetSearch = newSearch => {
    setPage(1);
    setSearch(newSearch);
    setDebouncing(true);
  };

  const incrementPage = () => setPage(p => p + 1);

  useEffect(() => {
    const fetchMovies = async (search, page) => {
      setDebouncing(false);
      setLoading(true);
      let fetchedMovies;
      if (search) {
        fetchedMovies = await get(`search/movie?query=${search}&page=${page}`);
      } else {
        fetchedMovies = await get(`discover/movie?page=${page}`);
      }
      setLoading(false);

      return fetchedMovies;
    };

    const getMovies = async () => {
      const fetchedMovies = await fetchMovies(debouncedSearch, page);

      if (page > 1) {
        setMovies(m => [...m, ...fetchedMovies.results]);
      } else {
        setMovies(fetchedMovies.results);
      }
      setHasMore(fetchedMovies.page < fetchedMovies.total_pages);
    };

    getMovies();
  }, [page, debouncedSearch]);

  return (
    <div>
      <Header />
      <Search search={search} setSearch={onSetSearch} />
      <Rating stars={stars} onChangeStars={onChangeStars} />
      <InfiniteScroll
        dataLength={movies.length}
        next={incrementPage}
        hasMore={hasMore && stars === 0}
      >
        <MoviesGrid
          movies={movies}
          stars={stars}
          loading={loading}
          debouncing={debouncing}
          initialLoad={page === 1}
        />
      </InfiniteScroll>
    </div>
  );
};

export default memo(LandingPage);
