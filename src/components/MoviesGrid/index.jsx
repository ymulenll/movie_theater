import React, { memo } from 'react';
import styles from './MoviesGrid.module.css';
import { useHistory } from 'react-router-dom';
import placeholder from '../../placeholder.jpg';
import getStarsRating from '../../utils/getStarsRating';
import Loader from '../Loader';

const MoviesGrid = ({ stars, movies, loading, debouncing, initialLoad }) => {
  const filterByStars = ({ vote_average }) => {
    const starsRating = getStarsRating(vote_average);
    return stars === 0 || stars === starsRating;
  };

  const history = useHistory();

  const moviesFiltered = movies.filter(filterByStars);

  return (
    <>
      <div>Total: {moviesFiltered.length}</div>
      {!loading && !debouncing && moviesFiltered.length === 0 && (
        <div className={styles.noResults}>
          No results found, please try with other filters...
        </div>
      )}
      <div className={styles.gridContainer}>
        {(!loading || !initialLoad) &&
          moviesFiltered.map(movie => (
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
                onClick={() => history.push(`/movies/${movie.id}`)}
              />
              <div>{movie.title}</div>
            </div>
          ))}
      </div>
      {loading && <Loader />}
    </>
  );
};

export default memo(MoviesGrid);
