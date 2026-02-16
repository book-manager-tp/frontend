import { useEffect, useState } from 'react';

interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

/**
 * Hook para realizar peticiones HTTP
 * <T = unknown> indica que el tipo de retorno es generico
 * Se puede especificar al llamar a la funcion
 */
export const useFetch = <T = unknown>(
  fetchFn: () => Promise<T>,
  dependencies: unknown[] = [],
): UseFetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await fetchFn();
        setData(result);
        setError(null);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchFn, ...dependencies]);

  return { data, loading, error };
};
