import Link from "next/link";

import { makeStyles } from "@material-ui/core/styles";

import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import FacebookIcon from "@material-ui/icons/Facebook";
import YouTubeIcon from "@material-ui/icons/YouTube";

import LinkButton from "@/components/UI/LinkButton";

const TheFooter = () => {
  const classes = useStyles();

  const navLinks = [
    { title: "newsy", path: "/categories/newsy" },
    { title: "festiwale", path: "/categories/festiwale" },
    { title: "koncerty", path: "/categories/koncerty" },
    { title: "patronat", path: "/categories/patronat" },
    { title: "relacje", path: "/categories/relacje" },
    { title: "wywiady", path: "/categories/wywiady" },
  ];

  const items = [
    { title: "tagi", path: "/tags" },
    { title: "kontakt", path: "/contact" },
  ];

  return (
    <footer className={classes.root}>
      <Container maxWidth="lg" className={classes.container}>
        <div className={classes.navigations}>
          {navLinks.map(({ title, path }) => (
            <LinkButton key={title} href={path} title={title} />
          ))}
        </div>
        <div className={classes.items}>
          {items.map(({ title, path }) => (
            <LinkButton key={title} href={path} title={title} />
          ))}
        </div>

        <div className={classes.socials}>
          <Link href="https://facebook.com/flesz.events" passHref>
            <Button className={classes.icon}>
              <FacebookIcon />
            </Button>
          </Link>
          <Link
            href="https://www.youtube.com/channel/UCtJGqTQUcJRNVi4gBqVqAfg"
            passHref
          >
            <Button className={classes.icon}>
              <YouTubeIcon />
            </Button>
          </Link>
        </div>
      </Container>
      <p className={classes.credit}>&copy; FleszEvents</p>
    </footer>
  );
};

export default TheFooter;

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    padding: "2rem 1rem",
  },
  navigations: {
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
  },
  items: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",

    "& .MuiButton-label": {
      justifyContent: "flex-start",
    },
  },
  socials: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  icon: {
    "& > .MuiButton-label": {
      justifyContent: "flex-start",
    },
    color: theme.palette.light.main,
  },
  credit: {
    textAlign: "center",
    margin: 0,
    paddingBottom: "2rem",
  },
}));
