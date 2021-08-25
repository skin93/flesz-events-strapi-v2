import React from 'react';
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
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'transparent',
    width: '100%',
    height: '300px',
    position: 'relative',

    boxShadow: 'rgba(0, 0, 0, 0.7) 0px 5px 15px',
    '& h2': {
      color: theme.palette.light.main,
    },
    '&:hover': {
      '& h2': {
        color: theme.palette.primary.main,
        transform: 'scale(1.1)',
      },
    },
  },
  media: {
    height: '200px',
    pointerEvents: 'none',
  },
  content: {
    width: '100%',
    height: '100px',
    padding: '5px 15px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    fontWeight: 600,
    fontSize: 'calc(1.2em + 0.1vw)',
    transition: '.2s all ease-in-out',
  },
}));
