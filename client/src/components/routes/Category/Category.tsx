import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NewsFeedItem } from "../HomePage";
import axios from "axios";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import {
  Box,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
  useTheme,
} from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import { Column } from "../../lib/Column";

export const Category = () => {
  const { category } = useParams();
  const theme = useTheme();
  const [newsfeed, setNewsFeed] = useState<NewsFeedItem[]>([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const getNewsFeed = async () => {
    try {
      const res = await axios.get("feeds/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        params: { category: category, page: pageIndex },
      });
      console.log(res);

      setNewsFeed((prevNewsFeed) => [...prevNewsFeed, ...res.data.results]);
      setHasMore(res.data.next != null);
      setPageIndex((prevPageIndex) => prevPageIndex + 1);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setPageIndex(1);
    setHasMore(true);
    setNewsFeed([]);
    getNewsFeed();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  return (
    <Box minHeight="100vh" sx={{ backgroundColor: theme.palette.primary.main }}>
      <InfiniteScroll
        dataLength={newsfeed.length}
        next={getNewsFeed}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        scrollableTarget="scroll-target"
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <ImageList
          variant="masonry"
          sx={{ transform: "translateZ(0)" }}
          cols={3}
          gap={8}
        >
          {newsfeed &&
            newsfeed.map(
              (feed) =>
                feed.image && (
                  <ImageListItem
                    key={feed.image}
                    sx={{ color: theme.palette.primary.contrastText }}
                  >
                    <img
                      srcSet={`${feed.image}?w=161&fit=crop&auto=format&dpr=2 2x`}
                      src={`${feed.image}?w=161&fit=crop&auto=format`}
                      alt={feed.title}
                      loading="lazy"
                    />
                    <ImageListItemBar
                      sx={{
                        color: "#12122b",
                        background: theme.palette.primary.contrastText,
                      }}
                      title={feed.date}
                      position="below"
                      actionIcon={
                        <IconButton
                          sx={{ color: "#12122b" }}
                          aria-label={`star ${feed.date}`}
                        >
                          <LunchDiningIcon />
                        </IconButton>
                      }
                      actionPosition="left"
                    />
                    <Box
                      padding={theme.spacing(4)}
                      sx={{
                        backgroundColor: theme.palette.primary.contrastText,
                      }}
                    >
                      <Column gap={4}>
                        <Typography variant="h5" sx={{ color: "#12122b" }}>
                          {feed.title}
                        </Typography>
                        <Typography variant="body1" sx={{ color: "#12122b" }}>
                          {feed.description}
                        </Typography>
                      </Column>
                    </Box>
                  </ImageListItem>
                )
            )}
        </ImageList>
      </InfiniteScroll>
    </Box>
  );
};
