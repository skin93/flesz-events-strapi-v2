import { Fragment, useRef, useState } from "react";

import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";

import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { ARTICLES_TITLE_QUERY } from "@/lib/queries/articles/articlesTitleQuery";

import { makeStyles } from "@material-ui/core/styles";
import { alpha } from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import Container from "@material-ui/core/Container";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Slide from "@material-ui/core/Slide";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import FacebookIcon from "@material-ui/icons/Facebook";

const SiteDrawer = dynamic(() => import("@/components/layout/SiteDrawer"));

const ResultsContainer = dynamic(() =>
  import("@/components/UI/ResultsContainer")
);

const HideOnScroll = (props) => {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

const navLinks = [
  { title: "news", path: "/categories/news" },
  { title: "festiwale", path: "/categories/festiwale" },
  { title: "koncerty", path: "/categories/koncerty" },
  { title: "mapa", path: "/festival-map" },
];

const TheHeader = (props) => {
  const classes = useStyles();
  const router = useRouter();
  const inputRef = useRef();
  const [search, setSearch] = useState("");

  const [articlesFound, setArticlesFound] = useState([]);

  const q = ARTICLES_TITLE_QUERY;

  const { data, error } = useSWR(q, fetcher);

  if (error) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p>Coś poszło nie tak...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p>Loading...</p>
      </div>
    );
  }

  const handleChange = (e) => {
    if (e.target.value === "") {
      clear();
      return;
    }
    setSearch(e.target.value);
    const articlesFound = data.articles.filter((article) =>
      article.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setArticlesFound(articlesFound);
  };

  const clear = () => {
    setArticlesFound([]);
    setSearch("");
  };

  return (
    <Fragment>
      <HideOnScroll {...props}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar variant="dense" id="back-to-top-anchor">
            <Container maxWidth="lg" className={classes.navbarDisplayFlex}>
              <div
                className={classes.navbarBrand}
                color="inherit"
                aria-label="home"
              >
                <Link href="/">
                  <img
                    src="/biale-logo-pelny-napis-akcent.png"
                    className={classes.logo}
                    alt="logo"
                  />
                </Link>
              </div>
              <Hidden smDown>
                <List
                  component="nav"
                  aria-label="main-navigation"
                  className={classes.navDisplayFlex}
                >
                  {navLinks.map(({ title, path }) => (
                    <Link href={`${path}`} key={title} passHref>
                      <a
                        className={
                          router.asPath === `${path}`
                            ? `${classes.active}`
                            : `${classes.linkText}`
                        }
                      >
                        <ListItem button>
                          <ListItemText primary={title} />
                        </ListItem>
                      </a>
                    </Link>
                  ))}
                  <Link href="https://facebook.com/flesz.events" passHref>
                    <ListItem button>
                      <FacebookIcon className={classes.icon} />
                    </ListItem>
                  </Link>
                </List>
              </Hidden>
              <Hidden mdDown>
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    value={search}
                    placeholder="Szukaj..."
                    onChange={handleChange}
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    inputProps={{ "aria-label": "search" }}
                  />
                </div>
              </Hidden>
              <Hidden mdUp>
                <SiteDrawer navLinks={navLinks} />
              </Hidden>
            </Container>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <div className={classes.offset} />
      {articlesFound.length > 0 && (
        <ResultsContainer articles={articlesFound} onClick={clear} />
      )}
    </Fragment>
  );
};

export default TheHeader;

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: theme.palette.black.main,
  },
  offset: theme.mixins.toolbar,
  home: {
    color: theme.palette.light.main,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign: "center",
  },
  navbarDisplayFlex: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  navbarBrand: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    position: "relative",
    width: "150px",
  },
  logo: {
    width: "100%",
    height: "100%",
    cursor: "pointer",
  },
  navDisplayFlex: {
    display: "flex",
    justifyContent: "space-between",
  },
  active: {
    textDecoration: "none",
    textTransform: "uppercase",
    color: theme.palette.accent.main,
  },
  linkText: {
    textDecoration: "none",
    textTransform: "uppercase",
    color: theme.palette.light.main,
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.light.main,
  },
  inputRoot: {
    color: theme.palette.light.main,
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
  icon: {
    color: theme.palette.light.main,
  },
}));
