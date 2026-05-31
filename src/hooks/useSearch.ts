import { useMemo } from 'react';
import { useDebounce } from './useDebounce';

export function useSearch<T>(data: T[], searchQuery: string, keys: (keyof T)[]) {
  const debouncedQuery = useDebounce(searchQuery, 300);

  const filteredData = useMemo(() => {
    if (!debouncedQuery) return data;

    const query = debouncedQuery.toLowerCase();
    return data.filter((item) =>
      keys.some((key) => String(item[key]).toLowerCase().includes(query))
    );
  }, [data, debouncedQuery, keys]);

  return filteredData;
}



