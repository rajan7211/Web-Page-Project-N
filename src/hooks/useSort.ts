import { useState, useMemo } from 'react';

export function useSort<T>(data: T[], defaultKey?: keyof T) {
  const [sortKey, setSortKey] = useState<keyof T | null>(defaultKey || null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const sortedData = useMemo(() => {
    if (!sortKey) return data;

    return [...data].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];

      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, sortKey, sortOrder]);

  const toggleSort = (key: keyof T) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  return { sortedData, sortKey, sortOrder, toggleSort };
}


