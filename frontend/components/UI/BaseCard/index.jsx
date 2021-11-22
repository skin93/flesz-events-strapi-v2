import React from 'react';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { getMediaUrl } from '@/lib/getMediaUrl';

const BaseCard = ({ article }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardMedia
        component='img'
        className={classes.media}
        image={getMediaUrl(article.image_cover)}
        title={article.title}
        alt={article.title}
      />
      <CardContent className={classes.content}>
        <Typography
          variant='subtitle1'
          component='h2'
          className={classes.title}>
          {article.title}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BaseCard;

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'transparent',
    width: 'calc(100% - 16px)',
    height: '300px',
    boxShadow: 'rgba(0, 0, 0, 0.7) 0px 5px 15px',
    '&:hover': {
      '& > img': {
        transform: 'scale(1.2) rotate(-5deg)',
      },
    },
  },
  media: {
    height: '100%',
    pointerEvents: 'none',
    transition: '.3s transform ease-in-out',
  },
  content: {
    position: 'absolute',
    inset: '0 0 0 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.8)',
    transition: '.3s all ease-in-out',
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,0.6)',
    },
  },
  title: {
    textAlign: 'left',
    fontWeight: 600,
    fontSize: 'calc(1.3rem + 0.1vw)',
    transition: '.2s all ease-in-out',
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
}));
