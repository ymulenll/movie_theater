import React, { memo } from 'react';
import './StarRating.css';

const StarRating = () => {
  return (
    <form action='#' id='star_rating'>
      <input
        value='1'
        id='star1'
        type='radio'
        name='rating'
        className='visuallyhidden'
      />
      <label htmlFor='star1'>
        <span className='visuallyhidden'>1 Star</span>
        <svg viewBox='0 0 512 512'>
          <path d='M512 198.525l-176.89-25.704-79.11-160.291-79.108 160.291-176.892 25.704 128 124.769-30.216 176.176 158.216-83.179 158.216 83.179-30.217-176.176 128.001-124.769z'></path>
        </svg>
      </label>

      <input
        value='2'
        id='star2'
        type='radio'
        name='rating'
        className='visuallyhidden'
      />
      <label htmlFor='star2'>
        <span className='visuallyhidden'>2 Stars</span>
        <svg viewBox='0 0 512 512'>
          <path d='M512 198.525l-176.89-25.704-79.11-160.291-79.108 160.291-176.892 25.704 128 124.769-30.216 176.176 158.216-83.179 158.216 83.179-30.217-176.176 128.001-124.769z'></path>
        </svg>
      </label>

      <input
        value='3'
        id='star3'
        type='radio'
        name='rating'
        className='visuallyhidden'
      />
      <label htmlFor='star3'>
        <span className='visuallyhidden'>3 Stars</span>
        <svg viewBox='0 0 512 512'>
          <path d='M512 198.525l-176.89-25.704-79.11-160.291-79.108 160.291-176.892 25.704 128 124.769-30.216 176.176 158.216-83.179 158.216 83.179-30.217-176.176 128.001-124.769z'></path>
        </svg>
      </label>

      <input
        value='4'
        id='star4'
        type='radio'
        name='rating'
        className='visuallyhidden'
      />
      <label htmlFor='star4'>
        <span className='visuallyhidden'>4 Stars</span>
        <svg viewBox='0 0 512 512'>
          <path d='M512 198.525l-176.89-25.704-79.11-160.291-79.108 160.291-176.892 25.704 128 124.769-30.216 176.176 158.216-83.179 158.216 83.179-30.217-176.176 128.001-124.769z'></path>
        </svg>
      </label>

      <input
        value='5'
        id='star5'
        type='radio'
        name='rating'
        className='visuallyhidden'
      />
      <label htmlFor='star5'>
        <span className='visuallyhidden'>5 Stars</span>
        <svg viewBox='0 0 512 512'>
          <path d='M512 198.525l-176.89-25.704-79.11-160.291-79.108 160.291-176.892 25.704 128 124.769-30.216 176.176 158.216-83.179 158.216 83.179-30.217-176.176 128.001-124.769z'></path>
        </svg>
      </label>

      <button type='submit' className='btn-small visuallyhidden focusable'>
        Submit rating
      </button>
    </form>
  );
};

export default memo(StarRating);
