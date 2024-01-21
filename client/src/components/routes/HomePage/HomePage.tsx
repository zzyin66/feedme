import React, { useEffect, useState } from "react";
import axios from "axios";
import { NewsCard } from "../../lib/NewsCard/NewsCard";
import { Box, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

export interface NewsFeedItem {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  image: string;
  url: string;
}

export const HomePage = () => {
  const navigate = useNavigate();
  const [newsfeed, setNewsFeed] = useState<NewsFeedItem[]>([]);
  useEffect(() => {
    const getNewsFeed = async () => {
      try {
        const res = await axios.get("recommendations/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });

        setNewsFeed(res.data);
      } catch (error: any) {
        console.error(error);
        if (error.response.status === 401) {
          navigate("/login");
        }
      }
    };

    getNewsFeed();
  }, [navigate]);
  return (
    <div id="page">
      <div id="header">Feed</div>
      {newsfeed &&
        newsfeed.map((feed) => <NewsCard item={feed} key={feed.title} />)}
    </div>
  );
};
