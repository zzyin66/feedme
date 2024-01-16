import React from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  useTheme,
} from '@mui/material';
import { NewsFeedItem } from './HomePage';

interface NewsCardProps {
  item: NewsFeedItem;
}

export const NewsCard = ({ item }: NewsCardProps) => {
  const theme = useTheme();
  return (
    <Card sx={{ borderRadius: '16px' }}>
      <CardMedia sx={{ height: 140 }} image={item.image} />
      <CardContent>
        <Typography gutterBottom variant='h6' component='div'>
          {item.title}
        </Typography>
        {/* Normally a card doesnt have description */}
        {/* <Typography variant='body2' color='text.secondary'>
          {item.description}
        </Typography> */}
      </CardContent>
      <CardActions>
        <Button size='small'>Button1</Button>
        <Button size='small'>Button2</Button>
      </CardActions>
    </Card>
  );
};
