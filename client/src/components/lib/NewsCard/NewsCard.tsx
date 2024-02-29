import React, { useState } from 'react';
import './NewsCard.css';
import { NewsFeedItem } from '../../routes/HomePage';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
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

      // Toggle the bookmark state upon successful request
      setCurrBookmarked((curr) => !curr);
    } catch (error) {
      console.error(error);
      // TODO: handle this error
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
      </div>
    );
  }
};
