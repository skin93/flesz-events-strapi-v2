import { Fragment, useMemo, useRef, useState } from "react";

import { useRouter } from "next/router";
import Link from "next/link";
import dynamic from "next/dynamic";

import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { ARTICLES_TITLE_QUERY } from "@/lib/queries/articles/articlesTitleQuery";

import { makeStyles } from "@material-ui/core/styles";
import { alpha } from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import Container from "@material-ui/core/Container";
import Hidden from "@material-ui/core/Hidden";
import Slide from "@material-ui/core/Slide";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import FacebookIcon from "@material-ui/icons/Facebook";
import LinkButton from "@/components/UI/LinkButton";

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
  { title: "newsy", path: "/categories/newsy" },
  { title: "festiwale", path: "/categories/festiwale" },
  { title: "koncerty", path: "/categories/koncerty" },
  { title: "patronat", path: "/categories/patronat" },
  { title: "relacje", path: "/categories/relacje" },
];

const items = [
  { title: "tagi", path: "/tags" },
  { title: "eventy", path: "/events" },
  { title: "festiwalowa mapa", path: "/festival-map" },
];

const TheHeader = (props) => {
  const classes = useStyles();
  const router = useRouter();
  const inputRef = useRef();
  const [search, setSearch] = useState("");

  const [anchorEl, setAnchorEl] = useState(null);

  const handleAnchor = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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

  const filteredArticles = useMemo(
    () =>
      data?.articles.filter(({ title }) =>
        title.toLowerCase().includes(search.toLowerCase())
      ),
    [search]
  );

  return (
    <Fragment>
      <HideOnScroll {...props}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar
            variant="dense"
            id="back-to-top-anchor"
            style={{ paddingInline: 0 }}
          >
            <Container maxWidth="lg" className={classes.container}>
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
                <nav aria-label="main-navigation" className={classes.navbar}>
                  <Button
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={handleAnchor}
                  >
                    Wpisy
                  </Button>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    {navLinks.map(({ title, path }) => (
                      <MenuItem key={title} onClick={handleClose}>
                        <LinkButton href={path} title={title} />
                      </MenuItem>
                    ))}
                  </Menu>
                  {items.map(({ title, path }) => (
                    <LinkButton key={title} href={path} title={title} />
                  ))}
                  <Link href="https://facebook.com/flesz.events" passHref>
                    <Button className={classes.icon}>
                      <FacebookIcon />
                    </Button>
                  </Link>
                </nav>
              </Hidden>
              <Hidden smDown>
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    value={search}
                    placeholder="Szukaj..."
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    inputProps={{ "aria-label": "search" }}
                  />
                </div>
              </Hidden>
              <Hidden mdUp>
                <SiteDrawer navLinks={navLinks} items={items} />
              </Hidden>
            </Container>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <div className={classes.offset} />
      {search && filteredArticles?.length > 0 && (
        <ResultsContainer articles={filteredArticles} />
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
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign: "center",
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingInline: "1rem",
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
  navbar: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    [theme.breakpoints.up("md")]: {
      flex: 5,
    },
  },

  search: {
    flex: 1,
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
