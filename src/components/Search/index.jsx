import React, { memo } from 'react';
import styles from './Search.module.css';

const Search = ({ search, setSearch }) => {
  return (
    <input
      className={styles.search}
      type='search'
      placeholder='Search movies...'
      onChange={element => setSearch(element.target.value)}
      value={search}
    />
  );
};

export default memo(Search);
