import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { NewsCard } from '../../lib/NewsCard';
import './HomePage.css';
import { CircularProgress } from '@mui/material';
import PageHeader from '../../lib/Header/Header';
import useSearchFilter from '../../../hooks/useSearchFilter';

export interface NewsFeedItem {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  image: string;
  url: string;
  isBookmarked: boolean;
}

interface BookmarkItem {
  id: number;
}

export const HomePage = () => {
  const navigate = useNavigate();
  const [newsfeed, setNewsFeed] = useState<NewsFeedItem[]>([]);
  const [bookmarkedIds, setBookmarkedIds] = useState(new Set());
  const [bookmarksFetched, setBookmarksFetched] = useState(false);
  const [loading, setLoading] = useState(true); // State to manage loading status
  const { filteredNewsFeed, handleSearchChange } = useSearchFilter(
    newsfeed.slice(1)
  );

  const fetchBookmarks = async () => {
    try {
      const response = await axios.get('/bookmarks/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      const bookmarkIds = new Set(
        response.data.map((item: BookmarkItem) => item.id)
      );
      setBookmarkedIds(bookmarkIds);
    } catch (error) {
      console.error('Failed to fetch bookmarks:', error);
    } finally {
      setBookmarksFetched(true);
    }
  };

  const getNewsFeed = async () => {
    try {
      setLoading(true); // Start loading

      const response = await axios.get('recommendations/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });

      const updatedNewsFeed = response.data.map((item: NewsFeedItem) => ({
        ...item,
        isBookmarked: bookmarkedIds.has(item.id),
      }));

      setNewsFeed(updatedNewsFeed);
    } catch (error: any) {
      console.error(error);
      if (error.response && error.response.status === 401) {
        navigate('/login');
      }
    } finally {
      setLoading(false); // Stop loading regardless of the outcome
    }
  };

  useEffect(() => {
    setBookmarksFetched(false);
    fetchBookmarks();
  }, []);

  useEffect(() => {
    if (bookmarksFetched) {
      getNewsFeed();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookmarksFetched]);

  return (
    <div className='page'>
      <PageHeader
        title='Home'
        subheader='Top Stories'
        onSearchChange={handleSearchChange}
      />
      {loading ? (
        <div
          style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}
        >
          <CircularProgress />
        </div>
      ) : (
        <>
          {newsfeed.length > 0 && (
            <NewsCard
              item={newsfeed[0]}
              topStory={true}
              isBookmarked={bookmarkedIds.has(newsfeed[0].id)}
            />
          )}
          {filteredNewsFeed.length > 0 ? (
            filteredNewsFeed.map((nf) => (
              <NewsCard key={nf.id} item={nf} isBookmarked={nf.isBookmarked} />
            ))
          ) : (
            <p className='no-search-message'>No results found.</p>
          )}
        </>
      )}
    </div>
  );
};
