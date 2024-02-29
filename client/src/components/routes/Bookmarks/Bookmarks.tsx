import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Bookmarks.css';
import { NewsCard } from '../../lib/NewsCard';
import { NewsFeedItem } from '../HomePage';

export const Bookmarks = () => {
  const navigate = useNavigate();
  const [bookmarks, setBookmarks] = useState<NewsFeedItem[]>([]);

  const getBookmarks = async () => {
    try {
      const res = await axios.get('bookmarks/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });

      setBookmarks(res.data);
    } catch (error: any) {
      console.error(error);
      if (error.response.status === 401) {
        navigate('/login');
      }
    }
  };

  useEffect(() => {
    getBookmarks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='page'>
      <div className='bookmarks-header'>
        <div className='header'>Bookmarks</div>
        <div className='bookmarks-header-actions'>
          <a href='#'>filter icon</a>
          <a href='#'>refresh icon</a>
        </div>
      </div>
      <div className='bookmarks-subheader'>
        <div className='subheader'>Your bookmarked articles</div>
      </div>

      {bookmarks.length > 0 ? (
        <div style={{ padding: '10px' }}>
          {bookmarks.map((bookmark, index) => (
            <NewsCard key={index} item={bookmark} isBookmarked={true} />
          ))}
        </div>
      ) : (
        <div className='no-bookmarks-message'>
          You have no bookmarks! Bookmark articles to save for later.
        </div>
      )}
    </div>
  );
};
