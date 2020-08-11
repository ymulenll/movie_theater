import React, {
  useState,
  memo,
  useEffect,
  useReducer,
  useCallback,
} from 'react';
import { get } from '../../utils/apiClient';
import Search from '../../components/Search';
import Rating from '../../components/Rating';
import Header from '../../components/Header';
import MoviesGrid from '../../components/MoviesGrid';
import InfiniteScroll from 'react-infinite-scroll-component';
import useDebounce from '../../hooks/useDebounce';

const LandingPage = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [debouncedSearch, debouncing] = useDebounce(search, 300);

  const [stars, setStars] = useState(0);

  const initialState = {
    movies: [],
    hasMore: true,
    loading: false,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const onChangeStars = useCallback(starPosition => {
    setStars(value => (starPosition === value ? 0 : starPosition));
  }, []);

  const onSetSearch = useCallback(newSearch => {
    setPage(1);
    setSearch(newSearch);
  }, []);

  const incrementPage = () => setPage(p => p + 1);

  useEffect(() => {
    const getMovies = async () => {
      dispatch({ type: 'FETCH_INIT' });

      let fetchedMovies;
      if (debouncedSearch) {
        fetchedMovies = await get(
          `search/movie?query=${debouncedSearch}&page=${page}`,
        );
      } else {
        fetchedMovies = await get(`discover/movie?page=${page}`);
      }

      dispatch({ type: 'FETCH_SUCCESS', payload: fetchedMovies });
    };

    getMovies();
  }, [page, debouncedSearch]);

  return (
    <div>
      <Header />
      <Search search={search} setSearch={onSetSearch} />
      <Rating stars={stars} onChangeStars={onChangeStars} />
      <InfiniteScroll
        dataLength={state.movies.length}
        next={incrementPage}
        hasMore={state.hasMore && stars === 0}
      >
        <MoviesGrid
          movies={state.movies}
          stars={stars}
          loading={state.loading}
          debouncing={debouncing}
          initialLoad={page === 1}
        />
      </InfiniteScroll>
    </div>
  );
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        loading: false,
        movies:
          action.payload.page > 1
            ? [...state.movies, ...action.payload.results]
            : action.payload.results,
        hasMore: action.payload.page < action.payload.total_pages,
      };

    default:
      throw new Error('action.type can not be empty');
  }
};

export default memo(LandingPage);
