import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NewsFeedItem } from "../HomePage";
import axios from "axios";
import { Box, useTheme } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import { NewsCard } from "../HomePage/NewsCard";

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
      {newsfeed && newsfeed.map((feed) => <NewsCard item={feed} />)}
    </InfiniteScroll>
  );
};
