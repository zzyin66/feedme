import React from "react";
import { NewsFeedItem } from "../../routes/HomePage";
import "./NewsCard.css";

interface NewsCardProps {
  item: NewsFeedItem;
}

export const NewsCard = ({ item }: NewsCardProps) => {
  return (
    <div id="newscard-main">
      <div id="newscard-media">
        <img id="newscard-media" src={item.image} alt="" />
      </div>
      <div id="newscard-content">
        <span id="subheader">{item.title}</span>
        <p id="text">{item.description}</p>
      </div>
    </div>
  );
};
