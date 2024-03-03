import React, { useState } from 'react';
import './NewsCard.css';
import { NewsFeedItem } from '../../routes/HomePage';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';

interface NewsCardProps {
  item: NewsFeedItem;
  topStory?: boolean;
  isBookmarked: boolean;
}

const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }; // Customize as needed
  return new Date(dateString).toLocaleDateString(undefined, options);
};
export const NewsCard = ({
  item,
  topStory = false,
  isBookmarked,
}: NewsCardProps) => {
  // State to track if the current article is bookmarked
  const [currBookmarked, setCurrBookmarked] = useState(isBookmarked);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const toggleBookmark = async () => {
    try {
      await axios.post(
        '/bookmarks/',
        { article_id: item.id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        }
      );

      // Determine the action message
      const message = currBookmarked ? 'Bookmark removed' : 'Bookmark added';
      setToastMessage(message);

      // Toggle the bookmark state upon successful request
      setCurrBookmarked((curr) => !curr);

      // Open the toast notification
      setToastOpen(true);
    } catch (error) {
      console.error(error);
      setToastMessage('Failed to toggle bookmark');
      setToastOpen(true);
    }
  };

  const markAsRead = async () => {
    try {
      await axios.post('mark_read/', {
        feed_id: item.id,
      });
    } catch (error) {
      console.error(error);
    }
  };

  if (topStory) {
    return (
      <div className='blog-card top-story'>
        <div className='blog-card__img'>
          <img src={item.image} alt='' />
        </div>
        <div className='blog-card__content'>
          <span className='blog-card__date'>{formatDate(item.date)}</span>
          <div className='blog-card__title'>{item.title}</div>
          <div className='blog-card__text'>{item.description}</div>
          <div className='buttons_row'>
            <a
              className='blog-card__button'
              target='_blank'
              rel='noopener noreferrer'
              href={item.url}
              onClick={markAsRead}
            >
              READ MORE
            </a>
            <IconButton
              onClick={toggleBookmark}
              aria-label='bookmark'
              className='bookmark-icon'
            >
              {currBookmarked ? <BookmarkRemoveIcon /> : <BookmarkAddIcon />}
            </IconButton>
          </div>
        </div>
      </div>
    );
  } else {
    // Regular card layout
    return (
      <div className='blog-card'>
        <div className='blog-card__img'>
          <img src={item.image} alt='' />
        </div>
        <div className='blog-card__content'>
          <div>
            <span className='blog-card__date'>{formatDate(item.date)}</span>
            <div className='blog-card__title'>{item.title}</div>
            <div className='blog-card__text'>{item.description}</div>
          </div>
          <div className='buttons_row'>
            <a
              className='blog-card__button'
              target='_blank'
              rel='noopener noreferrer'
              href={item.url}
              onClick={markAsRead}
            >
              READ MORE
            </a>
            <IconButton
              onClick={toggleBookmark}
              aria-label='bookmark'
              className='bookmark-icon'
            >
              {currBookmarked ? <BookmarkRemoveIcon /> : <BookmarkAddIcon />}
            </IconButton>
          </div>
        </div>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          open={toastOpen}
          autoHideDuration={6000}
          onClose={() => setToastOpen(false)}
          message={toastMessage}
        />
      </div>
    );
  }
};
