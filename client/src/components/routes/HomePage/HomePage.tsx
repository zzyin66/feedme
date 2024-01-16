import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NewsCard } from './NewsCard';
import { Box, ButtonBase, Typography, useTheme } from '@mui/material';
import { TopStoryCard } from '../../cards/TopStoryCard';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

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
        const res = await axios.get('recommendations/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
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
      // width='100vw' I dont think this is necessary. In fact, it makes overflow?
      minHeight='100vh'
      sx={{ backgroundColor: theme.palette.primary.main }}
    >
      <Box
        sx={{
          // backgroundColor: 'blue',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            width: 1000,
          }}
        >
          <Typography
            variant='h1'
            fontWeight={600}
            color={theme.palette.primary.contrastText}
          >
            Feeed
          </Typography>
          {newsfeed[0] !== undefined && <TopStoryCard item={newsfeed[0]} />}
          <ButtonBase
            sx={{
              margin: theme.spacing(32, 0, 8),
            }}
            // TODO: This button should take you somewhere
          >
            <Typography variant='h4' color={'#FFF'}>
              Your Top Stories
            </Typography>
            <ChevronRightIcon fontSize='large' sx={{ color: '#FFF' }} />
          </ButtonBase>
          <Box
            sx={{
              display: 'grid',
              gap: theme.spacing(16),
              gridTemplateColumns: 'repeat(3, 1fr)',
              alignSelf: 'center',
            }}
          >
            {newsfeed.map((feed) => (
              <NewsCard item={feed} key={feed.title} />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
