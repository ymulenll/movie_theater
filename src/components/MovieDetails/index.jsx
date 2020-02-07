import React, { memo } from 'react';
import Header from '../Header';
import Loader from '../Loader';
import styles from './MovieDetails.module.css';
import Rating from '../Rating';
import getStarsRating from '../../utils/getStarsRating';
import getImgSrc from '../../utils/getImgSrc';
import formatDate from '../../utils/formatDate';

const MovieDetails = ({ loading, movie }) => {
  return (
    <div>
      <Header />
      {loading && <Loader />}
      {!loading && (
        <div className={styles.details}>
          <div className={styles.imageContainer}>
            <img
              className={styles.image}
              src={getImgSrc(movie.poster_path, 500)}
              alt={movie.title}
            />
          </div>
          <div className={styles.detailsContent}>
            <div>
              <span>Title:</span> {movie.title}
            </div>
            <div>
              <span>Rating:</span>
              <Rating stars={getStarsRating(movie.vote_average)} viewOnly />
            </div>
            {!!movie.release_date && (
              <div>
                <span>Release date:</span> {formatDate(movie.release_date)}
              </div>
            )}
            {!!movie.genres?.length && (
              <div>
                <span>Genres:</span> {movie.genres.map(g => g.name).join(', ')}
              </div>
            )}
            {!!movie.overview && (
              <div>
                <span>Overview:</span> {movie.overview}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(MovieDetails);
