import { useState, useRef, useCallback } from 'react';

export function useInfiniteScroll<T>(
  items: T[],
  itemsPerPage = 3
) {
  const [visibleCount, setVisibleCount] = useState(itemsPerPage);

  const observer = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (!node) return;

      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver(
        (entries) => {
          if (
            entries[0].isIntersecting &&
            visibleCount < items.length
          ) {
            setVisibleCount((prev) =>
              Math.min(prev + itemsPerPage, items.length)
            );
          }
        },
        {
          threshold: 1.0,
        }
      );

      observer.current.observe(node);
    },
    [visibleCount, items.length, itemsPerPage]
  );

  return {
    visibleItems: items.slice(0, visibleCount),
    lastElementRef,
    hasMore: visibleCount < items.length,
  };
}



