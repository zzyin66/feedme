import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NewsFeedItem } from "../HomePage";
import axios from "axios";
import "./Category.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { NewsCard } from "../../lib/NewsCard";
import { CircularProgress } from "@mui/material";
import PageHeader from "../../lib/Header/Header";
import useSearchFilter from "../../../hooks/useSearchFilter";

interface BookmarkItem {
  id: number;
}

export const Category = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  const [newsfeed, setNewsFeed] = useState<NewsFeedItem[]>([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [bookmarkedIds, setBookmarkedIds] = useState(new Set());
  const [bookmarksFetched, setBookmarksFetched] = useState(false);
  const [loading, setLoading] = useState(true);
  const { filteredNewsFeed, handleSearchChange } = useSearchFilter(newsfeed);

  const fetchBookmarks = async () => {
    try {
      const response = await axios.get("/bookmarks/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      const bookmarkIds = new Set(
        response.data.map((item: BookmarkItem) => item.id)
      );
      setBookmarkedIds(bookmarkIds);
    } catch (error) {
      console.error("Failed to fetch bookmarks:", error);
      // TODO: handle error
    } finally {
      // Indicate that the bookmark fetch attempt has completed => fetch the feed
      setBookmarksFetched(true);
    }
  };

  const getNewsFeed = async () => {
    try {
      setLoading(true); // Start loading

      const res = await axios.get("feeds/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        params: { category: category, page: pageIndex },
      });

      const updatedNewsFeed = res.data.results.map((item: NewsFeedItem) => ({
        ...item,
        isBookmarked: bookmarkedIds.has(item.id),
      }));
      setNewsFeed((prevNewsFeed) => [...prevNewsFeed, ...updatedNewsFeed]);
      setHasMore(res.data.next != null);
      setPageIndex((prevPageIndex) => prevPageIndex + 1);
    } catch (error: any) {
      console.error(error);
      if (error.response.status === 401) {
        navigate("/login");
      }
    } finally {
      setLoading(false); // Stop loading regardless of the outcome
    }
  };

  useEffect(() => {
    setBookmarksFetched(false);
    window.scrollTo(0, 0);
    setPageIndex(1);
    setHasMore(true);
    setNewsFeed([]);
    fetchBookmarks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  // useEffect to call getNewsFeed after bookmarks are fetched
  useEffect(() => {
    if (bookmarksFetched) {
      getNewsFeed();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookmarksFetched]);

  return (
    <div className="page">
      <PageHeader
        title={category || ""}
        subheader="Most recent"
        onSearchChange={handleSearchChange}
      />

      <InfiniteScroll
        dataLength={newsfeed.length}
        next={getNewsFeed}
        hasMore={hasMore}
        loader={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "20px",
            }}
          >
            <CircularProgress />
          </div>
        }
        scrollableTarget="scroll-target"
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        style={{ overflowX: "hidden" }}
      >
        {filteredNewsFeed.length > 0
          ? filteredNewsFeed.map((nf) => (
              <NewsCard key={nf.id} item={nf} isBookmarked={nf.isBookmarked} />
            ))
          : newsfeed.length > 0 &&
            !loading && <p className="no-search-message">No results found.</p>}
      </InfiniteScroll>
    </div>
  );
};
