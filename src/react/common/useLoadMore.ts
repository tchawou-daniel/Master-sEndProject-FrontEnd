import { useMemo, useState } from 'react';

const DEFAULT_PAGE_SIZE = 50;

export default <T>(elements: T[], pageSize = DEFAULT_PAGE_SIZE) => {
  const [limit, setLimit] = useState(pageSize);

  const onClickLoadMore = useMemo(() => (
    // Should the button "Load more" be displayed?
    limit < elements.length
      // If true, return the callback you can call to load more items.
      ? () => setLimit(limit + pageSize)
      // Else return something falsy so you can condition the button display.
      : null
  ), [elements, limit, setLimit, pageSize]);

  const loadMoreProgress = `${limit}/${elements.length}`;

  const elementsCapped = useMemo(() => elements.slice(0, limit), [elements, limit]);

  return {
    elementsCapped,
    onClickLoadMore,
    loadMoreProgress,
  };
};
