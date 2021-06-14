import { useEffect, useState } from 'react';
import { get } from '../api/client';

export const useGet = <T>(
  path: string,
): { data: T | null; error: boolean | null; loading: boolean | null } => {
  const [response, setResponse] = useState({
    data: null,
    error: false,
    loading: true,
  });

  const getSomething = () => {
    get(path)
      .then((data) => ({ data, error: false, loading: false }))
      .catch((error) => ({ data: null, error, loading: false }))
      .then(setResponse);
  };

  useEffect(getSomething, []);

  return response;
};
