import { Fragment } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const LoadMoreButton = ({ onClick, onChange, next, count }) => {
  const classes = useStyles();

  return (
    <Fragment>
      <Button
        variant="outlined"
        onClick={onClick}
        onChange={onChange}
        className={classes.loadMoreButton}
        disabled={next >= count}
      >
        Wczytaj więcej
      </Button>
    </Fragment>
  );
};

export default LoadMoreButton;

const useStyles = makeStyles((theme) => ({
  loadMoreButton: {
    display: "block",
    margin: "3rem auto",
    fontWeight: 600,
    color: theme.palette.primary.main,
  },
}));
