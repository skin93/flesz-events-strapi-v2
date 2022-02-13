import Link from "next/link";

import { makeStyles } from "@material-ui/core/styles";

import Container from "@material-ui/core/Container";
import { ListItem, ListItemText } from "@material-ui/core";

const TheFooter = () => {
  const classes = useStyles();
  return (
    <footer className={classes.root}>
      <Container maxWidth="lg" className={classes.container}>
        <Link href={`/tags`} passHref>
          <a className={classes.linkText}>
            <ListItem button>
              <ListItemText primary="Tagi" />
            </ListItem>
          </a>
        </Link>
        <span>&copy; FleszEvents</span>
      </Container>
    </footer>
  );
};

export default TheFooter;

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "auto",
    backgroundColor: theme.palette.muted.darker,
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    padding: "1rem",
  },
  linkText: {
    textDecoration: "none",
    textTransform: "uppercase",
    color: theme.palette.light.main,
  },
}));
