import React, { useEffect, useState } from "react";
import axios from "axios";
import { NewsCard } from "./NewsCard";
import { Box, Typography, useTheme } from "@mui/material";

export interface NewsFeedItem {
  title: string;
  description: string;
  date: string;
  category: string;
  image: string;
}

export const HomePage = () => {
  const theme = useTheme();
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
      } catch (error) {
        console.error(error);
      }
    };

    getNewsFeed();
  }, []);
  return (
    <Box
      width="100vw"
      minHeight="100vh"
      sx={{ backgroundColor: theme.palette.primary.main }}
    >
      <Box>
        <Typography
          variant="h1"
          fontWeight={600}
          color={theme.palette.primary.contrastText}
        >
          Feeed
        </Typography>
      </Box>
      <Box
        sx={{
          display: "grid",
          gap: theme.spacing(2),
          padding: theme.spacing(2),
          gridTemplateColumns: "repeat(3, 1fr)",
        }}
      >
        {newsfeed &&
          newsfeed.map((feed) => <NewsCard item={feed} key={feed.title} />)}
      </Box>
    </Box>
  );
};
