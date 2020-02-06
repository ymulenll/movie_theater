import React, { useEffect, useState, memo } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { get } from '../../utils/apiClient';
import placeholder from '../../placeholder.jpg';
import styles from './MovieDetails.module.css';
import Rating from '../../components/Rating';
import Header from '../../components/Header';
import Loader from '../../components/Loader';
import getStarsRating from '../../utils/getStarsRating';

const MovieDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState({});
  const history = useHistory();

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      const fetchedMovie = await get(`movie/${id}`);
      setMovie(fetchedMovie);
      setLoading(false);
    };

    fetchMovie();
  }, [id, history]);

  return (
    <div>
      <Header />
      {loading && <Loader />}
      {!loading && (
        <div className={styles.details}>
          <div className={styles.imageContainer}>
            <img
              className={styles.image}
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : placeholder
              }
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
                <span>Release date:</span> {movie.release_date}
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
