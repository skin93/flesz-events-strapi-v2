import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import { getMediaUrl } from '@/lib/getMediaUrl';

const RelatedCard = ({ article }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <Box component='div' className={classes.box}>
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
        </Box>
      </CardActionArea>
    </Card>
  );
};

export default RelatedCard;

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    width: '300px',
    height: '100px',
    margin: '10px auto',
  },
  box: {
    display: 'flex',
    flexDirection: 'row',
  },
  media: {
    height: '100px',
    width: '300px',
  },
  content: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 100,
    backgroundColor: theme.palette.background.lighter,
  },
  title: {
    fontWeight: 'bold',
    color: theme.palette.light.main,
    margin: 0,
    fontSize: 'calc(9px + 0.2vw)',
    [theme.breakpoints.up('lg')]: {
      fontSize: '12px',
    },
  },
}));
