import React from 'react';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const LoadMoreButton = ({ onClick, onChange, next, count }) => {
  const classes = useStyles();

  return (
    <>
      <Button
        onClick={onClick}
        onChange={onChange}
        variant='outlined'
        className={classes.loadMoreButton}
        disabled={next >= count}>
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
