import React from "react";
import "./NewsCard.css";
import { NewsFeedItem } from "../../routes/HomePage";
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
    <div className="blog-card">
      <div className="blog-card__img">
        <img src={item.image} alt="" />
      </div>
      <div className="blog-card__content">
        <span className="blog-card__date">{item.date}</span>
        <div className="blog-card__title">{item.title}</div>
        <div className="blog-card__text">{item.description}</div>
        <a
          className="blog-card__button"
          target="_blank"
          rel="noopener noreferrer"
          href={item.url}
          onClick={markAsRead}
        >
          READ MORE
        </a>
      </div>
    </div>
  );
};
