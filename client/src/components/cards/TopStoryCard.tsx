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
import { NewsFeedItem } from '../routes/HomePage/HomePage';

interface NewsCardProps {
  item: NewsFeedItem;
}

export const TopStoryCard = ({ item }: NewsCardProps) => {
  const theme = useTheme();
  console.log(item);
  return (
    <Card sx={{ borderRadius: '16px' }}>
      <CardMedia sx={{ height: 300 }} image={item.image} />
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {item.title}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {item.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size='small'>Button1</Button>
        <Button size='small'>Button2</Button>
      </CardActions>
    </Card>
  );
};
