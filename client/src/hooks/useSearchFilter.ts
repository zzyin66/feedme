import { useState, useMemo } from 'react';
import { NewsFeedItem } from '../components/routes/HomePage';

// Custom hook to handle search text and filter newsfeed items
function useSearchFilter(newsfeed: NewsFeedItem[]) {
  const [searchText, setSearchText] = useState('');

  // Memoize the filtered newsfeed to avoid unnecessary recalculations
  const filteredNewsFeed = useMemo(() => {
    return newsfeed.filter(
      (item) =>
        item.title.toLowerCase().includes(searchText) ||
        item.description.toLowerCase().includes(searchText) ||
        item.category.toLowerCase().includes(searchText) ||
        item.url.toLowerCase().includes(searchText)
    );
  }, [newsfeed, searchText]);

  // Function to handle search text changes
  const handleSearchChange = (searchValue: string) => {
    setSearchText(searchValue.toLowerCase());
  };

  return { searchText, setSearchText, filteredNewsFeed, handleSearchChange };
}

export default useSearchFilter;
