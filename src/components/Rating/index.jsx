import React, { memo } from 'react';
import styles from './Rating.module.css';

const Star = ({ checked, onClick, viewOnly }) => (
  <span
    className={`${styles.star} ${viewOnly ? styles.viewOnly : ''}`}
    onClick={onClick}
  >
    <i className={`fa fa-star ${checked ? styles.checked : ' '}`} />
  </span>
);

const Rating = ({ stars, onChangeStars, viewOnly }) => {
  return (
    <div>
      {[1, 2, 3, 4, 5].map(starPosition => (
        <Star
          key={starPosition}
          checked={stars >= starPosition}
          onClick={() => viewOnly || onChangeStars(starPosition)}
          viewOnly={viewOnly}
        />
      ))}
    </div>
  );
};

export default memo(Rating);
