import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { NewsCard } from '../../lib/NewsCard';
import './HomePage.css';

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
  }, [bookmarksFetched]);

  return (
    <div className='page'>
      <div className='home-header'>
        <div className='header'>Home</div>
        <div className='home-header-actions'>
          <a href='#'>Filter Icon</a>
          <a href='#'>Refresh Icon</a>
        </div>
      </div>
      <div className='home-subheader'>
        <div className='subheader'>Top Stories</div>
      </div>

      {newsfeed.length > 0 && (
        <NewsCard
          item={newsfeed[0]}
          topStory={true}
          isBookmarked={bookmarkedIds.has(newsfeed[0].id)}
        />
      )}

      {newsfeed.slice(1).map((item, index) => (
        <NewsCard
          key={index}
          item={item}
          isBookmarked={bookmarkedIds.has(item.id)}
        />
      ))}
    </div>
  );
};
