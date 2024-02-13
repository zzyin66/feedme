import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { NewsCard } from "../../lib/NewsCard";

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
    <div
      id="page"
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div style={{ width: 900 }}>
        <div
          id="header"
          style={{
            borderBottom: "2px solid black",
            marginBottom: 8,
          }}
        >
          Feed
        </div>
        {newsfeed[0] !== undefined && <NewsCard item={newsfeed[0]} topStory />}
        <div id="h2" style={{ marginBottom: 16 }}>
          Your Top Stories {">"}
          {/* TODO: use a chevron icon instead of > */}
        </div>
        {newsfeed &&
          newsfeed
            .slice(1, 7)
            .map((feed) => <NewsCard item={feed} key={feed.title} />)}
        <div id="h2" style={{ marginBottom: 16 }}>
          Most Recent {">"}
          {/* TODO: use a chevron icon instead of > */}
        </div>
        <div id="h2" style={{ marginBottom: 16 }}>
          Your Top Category {">"}
          {/* TODO: use a chevron icon instead of > */}
          {/* TODO: Display the top category */}
        </div>
      </div>
    </div>
  );
};
