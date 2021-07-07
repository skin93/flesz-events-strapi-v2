import React from 'react';
import Link from 'next/link';

import grey from '@material-ui/core/colors/grey';

import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Fade from '@material-ui/core/Fade';

const TagsContainer = ({ tags }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={2} className={classes.container}>
      {tags.map((tag) => (
        <Fade key={tag.id} in timeout={200}>
          <Grid item xs={6} sm={4}>
            <Link href={`/tags/${tag.slug}`} passHref>
              <a>
                <div className={classes.tagItem}>
                  <span>#</span>
                  <p>{tag.name}</p>
                </div>
              </a>
            </Link>
          </Grid>
        </Fade>
      ))}
    </Grid>
  );
};

export default TagsContainer;

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: '30px',
  },
  tagItem: {
    '& > p': {
      color: theme.palette.light.main,
    },
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 'calc(.7rem + .5vw)',
    backgroundColor: 'inherit',
    transition: 'all .2s ease-in-out',
    '& span': {
      color: theme.palette.accent.main,
    },
    '&:hover': {
      backgroundColor: theme.palette.muted.darker,
    },
  },
}));
