import React, { useEffect, useState, memo } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { get } from '../../utils/apiClient';
import MovieDetails from '../../components/MovieDetails';

const MovieDetailsPage = () => {
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

  return <MovieDetails loading={loading} movie={movie} />;
};

export default memo(MovieDetailsPage);
