import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Bookmarks.css';
import { NewsCard } from '../../lib/NewsCard';
import { NewsFeedItem } from '../HomePage';
import PageHeader from '../../lib/Header/Header';
import { CircularProgress } from '@mui/material';

export const Bookmarks = () => {
  const navigate = useNavigate();
  const [bookmarks, setBookmarks] = useState<NewsFeedItem[]>([]);
  const [loading, setLoading] = useState(true); // State to manage loading status

  const getBookmarks = async () => {
    try {
      setLoading(true); // Start loading
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
    } finally {
      setLoading(false); // Stop loading regardless of the outcome
    }
  };

  useEffect(() => {
    getBookmarks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='page'>
      <PageHeader
        title='Bookmarks'
        subheader='Your bookmarked articles'
        showActions={false}
      />
      {loading ? (
        <div
          style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}
        >
          <CircularProgress />
        </div>
      ) : (
        <>
          {bookmarks.length > 0 ? (
            <div>
              {bookmarks.map((bookmark, index) => (
                <NewsCard key={index} item={bookmark} isBookmarked={true} />
              ))}
            </div>
          ) : (
            <div className='no-bookmarks-message'>
              You have no bookmarks! Bookmark articles to save for later.
            </div>
          )}
        </>
      )}
    </div>
  );
};
