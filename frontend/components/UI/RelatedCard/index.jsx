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
    backgroundColor: 'transparent',
    height: '100px',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    boxShadow: 'none',
    '& h4': {
      color: theme.palette.light.main,
    },
    '&:hover h4': {
      color: theme.palette.primary.main,
    },
  },
  media: {
    height: '100%',
    width: '150px',
    objectFit: 'cover',
    objectPosition: 'center top',
    pointerEvents: 'none',
  },
  content: {
    width: '100%',
    display: 'flex',
    padding: '0 0 0 16px',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: '100%',
  },
  title: {
    fontWeight: 'bold',
    color: theme.palette.light.main,
    margin: 0,
    fontSize: 'calc(11px + 0.2vw)',
    [theme.breakpoints.up('lg')]: {
      fontSize: '13px',
    },
  },
}));
