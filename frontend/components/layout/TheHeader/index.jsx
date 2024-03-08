import { Fragment, useRef, useState } from "react";

import { useRouter } from "next/router";
import Link from "next/link";
import dynamic from "next/dynamic";

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
import YouTubeIcon from "@material-ui/icons/YouTube";
import LinkButton from "@/components/UI/LinkButton";
import Logo from "@/components/UI/Logo";

const SiteDrawer = dynamic(() => import("@/components/layout/SiteDrawer"));

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
  { title: "single", path: "/categories/single" },
  { title: "festiwale", path: "/categories/festiwale" },
  { title: "koncerty", path: "/categories/koncerty" },
  { title: "patronat", path: "/categories/patronat" },
  { title: "relacje", path: "/categories/relacje" },
  { title: "wywiady", path: "/categories/wywiady" },
];

const items = [{ title: "kontakt", path: "/contact" }];

const TheHeader = (props) => {
  const classes = useStyles();
  const router = useRouter();
  const inputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/search?q=${inputRef.current.value}`);
    inputRef.current.value = "";
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleAnchor = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Fragment>
      <HideOnScroll {...props}>
        <AppBar className={classes.appBar}>
          <Toolbar id="back-to-top-anchor" style={{ paddingInline: 0 }}>
            <Container maxWidth="lg" className={classes.container}>
              <Logo />
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
                  <Link
                    href="https://www.youtube.com/channel/UCtJGqTQUcJRNVi4gBqVqAfg"
                    passHref
                  >
                    <Button className={classes.icon}>
                      <YouTubeIcon />
                    </Button>
                  </Link>
                </nav>
              </Hidden>
              <form onSubmit={handleSubmit} className={classes.searchForm}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  inputRef={inputRef}
                  placeholder="Szukaj..."
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ "aria-label": "search" }}
                />
              </form>

              <Hidden mdUp>
                <SiteDrawer navLinks={navLinks} items={items} />
              </Hidden>
            </Container>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <div className={classes.offset} />
    </Fragment>
  );
};

export default TheHeader;

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: theme.palette.black.main,
    // padding: "0.5rem",
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

  searchForm: {
    flex: 0.75,
    marginRight: theme.spacing(1),
    marginLeft: "auto",
    [theme.breakpoints.up("sm")]: {
      flex: 0.5,
    },
    [theme.breakpoints.up("md")]: {
      flex: 1,
    },

    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
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
