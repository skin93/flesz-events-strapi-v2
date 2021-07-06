import React from 'react';
import Link from 'next/link';

import { makeStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';
import { ListItem, ListItemText } from '@material-ui/core';

const TheFooter = () => {
  const classes = useStyles();
  return (
    <footer className={classes.root}>
      <Container maxWidth='lg' className={classes.container}>
        <Link href={`/tags`} passHref>
          <a className={classes.linkText}>
            <ListItem button>
              <ListItemText primary='Tagi' />
            </ListItem>
          </a>
        </Link>
        <span>&copy; Flesz.Events</span>
      </Container>
    </footer>
  );
};

export default TheFooter;

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: 100,
    top: 'auto',
    bottom: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',    backgroundColor: theme.palette.muted.darker,
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  linkText: {
    textDecoration: 'none',
    textTransform: 'uppercase',
    color: theme.palette.light.main,
  },
}));
