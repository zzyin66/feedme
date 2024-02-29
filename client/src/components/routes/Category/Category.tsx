import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { NewsFeedItem } from '../HomePage';
import axios from 'axios';
import './Category.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import { NewsCard } from '../../lib/NewsCard';

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

  const fetchBookmarks = async () => {
    try {
      const response = await axios.get('/bookmarks/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      const bookmarkIds = new Set(
        response.data.map((item: BookmarkItem) => item.id)
      );
      setBookmarkedIds(bookmarkIds);
    } catch (error) {
      console.error('Failed to fetch bookmarks:', error);
      // TODO: handle error
    } finally {
      // Indicate that the bookmark fetch attempt has completed => fetch the feed
      setBookmarksFetched(true);
    }
  };

  const getNewsFeed = async () => {
    try {
      const res = await axios.get('feeds/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
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
        navigate('/login');
      }
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
    <div className='page'>
      <div className='category-header'>
        <div className='header'>{category}</div>
        <div className='category-header-actions'>
          <a href='#'>filter icon</a>
          <a href='#'>refresh icon</a>
        </div>
      </div>
      <div className='category-subheader'>
        <div className='subheader'>Most recent</div>
      </div>

      <InfiniteScroll
        dataLength={newsfeed.length}
        next={getNewsFeed}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        scrollableTarget='scroll-target'
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        style={{ overflowX: 'hidden', padding: '10px' }}
      >
        {newsfeed &&
          newsfeed.map((nf) => (
            <NewsCard item={nf} isBookmarked={nf.isBookmarked} />
          ))}
      </InfiniteScroll>
    </div>
  );
};
