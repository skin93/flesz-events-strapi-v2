import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import { getMediaUrl } from '@/lib/getMediaUrl';

const RelatedCard = ({ article }) => {
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
          gutterBottom
          variant='subtitle2'
          component='h4'
          className={classes.title}>
          {article.title}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default RelatedCard;

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    width: '100%',
    height: '100px',
  },
  media: {
    height: '100%',
  },
  content: {
    position: 'absolute',
    top: 0,
    left: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    transition: 'all .2s ease-in-out',
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    width: '100%',
    height: '100%',
  },
  title: {
    fontWeight: 'bold',
    color: theme.palette.light.main,
    margin: 0,
    fontSize: 'calc(9px + 0.2vw)',
    [theme.breakpoints.up('lg')]: {
      fontSize: '13px',
    },
  },
}));
