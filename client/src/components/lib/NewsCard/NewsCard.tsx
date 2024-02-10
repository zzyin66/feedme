import React from "react";
import { NewsFeedItem } from "../../routes/HomePage";
import "./NewsCard.css";
import axios from "axios";

interface NewsCardProps {
  item: NewsFeedItem;
  topStory?: boolean;
}

export const NewsCard = ({ item, topStory = false }: NewsCardProps) => {
  const markAsRead = async () => {
    try {
      await axios.post("mark_read/", {
        feed_id: item.id,
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      {topStory ? (
        <div className="top newscard-main">
          <div className="top newscard-content">
            <a
              className="subheader"
              target="_blank"
              rel="noopener noreferrer"
              href={item.url}
              onClick={markAsRead}
            >
              {item.title}
            </a>
            <p className="text" style={{ margin: 0 }}>
              {item.description}
            </p>
          </div>
          <div className="top newscard-media">
            <img className="top newscard-media" src={item.image} alt="" />
          </div>
        </div>
      ) : (
        <div className="newscard-main">
          <div className="newscard-media">
            <img className="newscard-media" src={item.image} alt="" />
          </div>
          <div className="newscard-content">
            <a
              className="subheader"
              target="_blank"
              rel="noopener noreferrer"
              href={item.url}
              onClick={markAsRead}
            >
              {item.title}
            </a>
            <p className="text">{item.description}</p>
          </div>
        </div>
      )}
    </>
  );
};
