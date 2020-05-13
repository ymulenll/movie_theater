// https://www.robinwieruch.de/react-hooks-fetch-data
import { useEffect, useReducer, useState } from 'react';
import { get } from '../utils/apiClient';

export default (initialUrl, initialData) => {
  const [url, setUrl] = useState(initialUrl);
  const [state, dispatch] = useReducer(reducer, {
    data: initialData,
    loading: false,
    error: false,
  });

  useEffect(() => {
    let didCancel = false;
    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' });

      try {
        const data = await get(url);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: 'FETCH_ERROR' });
        }
      }

      return () => {
        didCancel = true;
      };
    };

    fetchData();
  }, [url]);

  return [state, setUrl];
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return { ...state, loading: true, error: false };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        loading: false,
        error: false,
        data: action.payload,
      };
    case 'FETCH_ERROR':
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      throw new Error('action.type can not be empty');
  }
};
