import React, { memo } from 'react';
import styles from './MoviesGrid.module.css';
import { useHistory } from 'react-router-dom';
import getStarsRating from '../../utils/getStarsRating';
import getImgSrc from '../../utils/getImgSrc';

const MoviesGrid = ({ stars, movies }) => {
  const filterByStars = ({ vote_average }) => {
    const starsRating = getStarsRating(vote_average);
    return stars === 0 || stars === starsRating;
  };

  const history = useHistory();

  const moviesFiltered = movies.filter(filterByStars);

  return (
    <>
      {moviesFiltered.length === 0 && (
        <div className={styles.noResults}>
          No results found, please try with other filters...
        </div>
      )}
      <div className={styles.gridContainer}>
        {moviesFiltered.map(movie => (
          <div key={movie.id} className={styles.gridItem}>
            <img
              width='100%'
              src={getImgSrc(movie.poster_path, 300)}
              alt={movie.title}
              className={styles.image}
              onClick={() => history.push(`/movies/${movie.id}`)}
            />
            <div>{movie.title}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default memo(MoviesGrid);
