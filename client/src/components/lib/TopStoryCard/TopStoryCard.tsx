import React from 'react';
import { NewsFeedItem } from '../../routes/HomePage';
import './TopStoryCard.css';

interface NewsCardProps {
  item: NewsFeedItem;
}

export const TopStoryCard = ({ item }: NewsCardProps) => {
  return (
    <div id='topstorycard-main'>
      <div id='topstorycard-content'>
        <span id='subheader'>{item.title}</span>
        <p id='text' style={{ margin: 0 }}>
          {item.description}
        </p>
      </div>
      <div id='topstorycard-media'>
        <img id='topstorycard-media' src={item.image} alt='' />
      </div>
    </div>
  );
};
