import React, { memo, useState } from 'react';
import styles from './Rating.module.css';

const Star = ({ checked, onClick, viewOnly, onMouseOver, onMouseLeave }) => (
  <span
    className={`${styles.star} ${viewOnly ? styles.viewOnly : ''}`}
    onClick={onClick}
    onMouseOver={onMouseOver}
    onMouseLeave={onMouseLeave}
  >
    <i className={`fa fa-star ${checked ? styles.checked : ' '}`} />
  </span>
);

const Rating = ({ stars, onChangeStars, viewOnly }) => {
  const [starOver, setStarOver] = useState(0);
  return (
    <div>
      {[1, 2, 3, 4, 5].map(starPosition => (
        <Star
          key={starPosition}
          checked={starOver ? starPosition <= starOver : stars >= starPosition}
          onClick={() => {
            setStarOver(0);
            viewOnly || onChangeStars(starPosition);
          }}
          viewOnly={viewOnly}
          onMouseOver={() => !viewOnly && setStarOver(starPosition)}
          onMouseLeave={() => !viewOnly && setStarOver(0)}
        />
      ))}
    </div>
  );
};

export default memo(
  Rating,
  (prevProps, props) =>
    prevProps.stars === props.stars && prevProps.viewOnly === props.viewOnly,
);
