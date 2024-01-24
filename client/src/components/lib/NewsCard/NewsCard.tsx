import React from 'react';
import { NewsFeedItem } from '../../routes/HomePage';
import './NewsCard.css';

interface NewsCardProps {
  item: NewsFeedItem;
  topStory?: boolean;
}

export const NewsCard = ({ item, topStory = false }: NewsCardProps) => {
  return (
    <>
      {topStory ? (
        <div className='top newscard-main'>
          <div className='top newscard-content'>
            <span className='subheader'>{item.title}</span>
            <p className='text' style={{ margin: 0 }}>
              {item.description}
            </p>
          </div>
          <div className='top newscard-media'>
            <img className='top newscard-media' src={item.image} alt='' />
          </div>
        </div>
      ) : (
        <div className='newscard-main'>
          <div className='newscard-media'>
            <img className='newscard-media' src={item.image} alt='' />
          </div>
          <div className='newscard-content'>
            <span className='subheader'>{item.title}</span>
            <p className='text'>{item.description}</p>
          </div>
        </div>
      )}
    </>
  );
};
