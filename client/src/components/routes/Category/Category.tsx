import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NewsFeedItem } from "../HomePage";
import axios from "axios";
import "./Category.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { NewsCard } from "../../lib/NewsCard/";

export const Category = () => {
  const navigate = useNavigate();
  const { category } = useParams();
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
    } catch (error: any) {
      console.error(error);
      if (error.response.status === 401) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setPageIndex(1);
    setHasMore(true);
    setNewsFeed([]);
    getNewsFeed();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  return (
    <div id="page">
      <div id="category-header">
        <div id="header">{category}</div>
        <div id="category-header-actions">
          <a>filter icon</a>
          <a>refresh icon</a>
        </div>
      </div>
      <div id="category-subheader">
        <div id="subheader">Most recent</div>
      </div>

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
        {newsfeed && newsfeed.map((nf) => <NewsCard item={nf} />)}
      </InfiniteScroll>
    </div>
  );
};
