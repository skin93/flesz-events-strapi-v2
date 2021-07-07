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
        className={classes.media}
        image={getMediaUrl(article.image_cover)}
        title={article.title}
        alt={article.title}
      />
      <CardContent className={classes.content}>
        <Typography gutterBottom variant='button' className={classes.category}>
          {article.category.name}
        </Typography>

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
    width: '100%',
    height: '250px',
    position: 'relative',
    borderRadius: '10px',
  },
  actionsArea: {
    height: '100%',
  },
  category: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: '.8em',
    color: theme.palette.accent.main,
    cursor: 'pointer',
  },
  media: {
    position: 'relative',
    height: '100%',
  },
  content: {
    position: 'absolute',
    top: 0,
    left: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(0,0,0,0.7)',
    transition: 'all .2s ease-in-out',
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,0.2)',
    },
    width: '100%',
    height: '100%',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 'calc(1.2em + 0.1vw)',
    color: theme.palette.light.main,
  },
  published: {
    color: theme.palette.muted.main,
    fontWeight: 'bold',
  },
}));
