import React, { memo } from 'react';
import styles from './MoviesGrid.module.css';
import { useHistory } from 'react-router-dom';
import getStarsRating from '../../utils/getStarsRating';
import getImgSrc from '../../utils/getImgSrc';
import Loader from '../Loader';

const MoviesGrid = ({ stars, movies, loading, debouncing, initialLoad }) => {
  const filterByStars = ({ vote_average }) => {
    const starsRating = getStarsRating(vote_average);
    return stars === 0 || stars === starsRating;
  };

  const history = useHistory();

  const moviesFiltered = movies.filter(filterByStars);
  const redirectToDetails = movieId => history.push(`/movies/${movieId}`);

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
          moviesFiltered.map((movie, index) => (
            <div key={movie.id} className={styles.gridItem}>
              <img
                width='100%'
                src={getImgSrc(movie.poster_path, 300)}
                alt={movie.title}
                className={styles.image}
                onClick={() => redirectToDetails(movie.id)}
                onKeyDown={({ key }) =>
                  key === 'Enter' && redirectToDetails(movie.id)
                }
                tabIndex={0}
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
