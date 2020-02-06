import React, { memo } from 'react';
import styles from './Rating.module.css';

const Star = ({ checked, onClick }) => (
  <span className={styles.star} onClick={onClick}>
    <i className={`fa fa-star ${checked ? styles.checked : ''}`} />
  </span>
);

const Rating = ({ stars, onChangeStars }) => {
  return (
    <div>
      {[1, 2, 3, 4, 5].map(starPosition => (
        <Star
          key={starPosition}
          checked={stars >= starPosition}
          onClick={() => onChangeStars(starPosition)}
        />
      ))}
    </div>
  );
};

export default memo(Rating);
