import React from 'react';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const LoadMoreButton = ({ handleClick, count, items }) => {
  const classes = useStyles();

  return (
    <>
      <Button
        onClick={handleClick}
        variant='outlined'
        className={classes.loadMoreButton}
        disabled={count === items.length}>
        Wczytaj więcej
      </Button>
    </>
  );
};

export default LoadMoreButton;

const useStyles = makeStyles((theme) => ({
  loadMoreButton: {
    display: 'block',
    margin: '30px auto',
    fontWeight: 'bold',
    color: theme.palette.accent.main,
  },
}));
