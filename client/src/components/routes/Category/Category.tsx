import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NewsFeedItem } from "../HomePage";
import axios from "axios";
import "./Category.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { NewsCardNew } from "../../lib/NewsCard/NewsCardNew";

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
    <div className="page">
      <div className="category-header">
        <div className="header">{category}</div>
        <div className="category-header-actions">
          <a href="#">filter icon</a>
          <a href="#">refresh icon</a>
        </div>
      </div>
      <div className="category-subheader">
        <div className="subheader">Most recent</div>
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
        style={{ overflowX: "hidden", padding: "10px" }}
      >
        {newsfeed && newsfeed.map((nf) => <NewsCardNew item={nf} />)}
      </InfiniteScroll>
    </div>
  );
};
