import React from 'react';

const MovieDetails = ({ movie }) => {
  return (
    <div>
      <div>Title: {movie.title}</div>
      <div>Rating: {movie.vote_average}</div>
      <div>Release data: {movie.release_date}</div>
      <div>Overview: {movie.overview}</div>
    </div>
  );
};

export default MovieDetails;
