import React from 'react';
import Link from 'next/link';

import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Fade from '@material-ui/core/Fade';

const TagsContainer = ({ tags }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={2} className={classes.container}>
      {tags.map((tag) => (
        <Fade key={tag.id} in timeout={500}>
          <Grid item xs={6} sm={4}>
            <Link href={`/tags/${tag.slug}`}>
              <a>
                <Box component='div' className={classes.tagItem}>
                  <span>#</span>
                  <p>{tag.name}</p>
                </Box>
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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.palette.light.main,
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
