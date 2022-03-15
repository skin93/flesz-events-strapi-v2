import { useState, useCallback } from "react";

import { useRouter } from "next/router";
import Link from "next/link";

import { makeStyles } from "@material-ui/core/styles";

import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/icons/Menu";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import FacebookIcon from "@material-ui/icons/Facebook";

import Drawer from "@material-ui/core/Drawer";

const SiteDrawer = ({ navLinks }) => {
  const classes = useStyles();
  const router = useRouter();

  const [state, setState] = useState({ right: false });

  const toggleDrawer = useCallback(
    (anchor, open) => (event) => {
      if (
        event.type === "keydown" &&
        (event.key === "Tab" || event.key === "Shift")
      ) {
        return;
      }
      setState({ [anchor]: open });
    },
    []
  );

  const sideDrawerList = (anchor) => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List
        component="nav"
        aria-labelledby="main navigation"
        className={classes.list}
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
    </div>
  );

  return (
    <>
      <IconButton
        edge="start"
        aria-label="menu"
        onClick={toggleDrawer("right", true)}
      >
        <Menu fontSize="large" style={{ color: "white" }} />
      </IconButton>
      <Drawer
        anchor="right"
        open={state.right}
        onClose={toggleDrawer("right", false)}
      >
        {sideDrawerList("right")}
      </Drawer>
    </>
  );
};

export default SiteDrawer;

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  active: {
    textDecoration: `none`,
    textTransform: `uppercase`,
    color: theme.palette.primary.main,
  },
  linkText: {
    textDecoration: `none`,
    textTransform: `uppercase`,
    color: theme.palette.light.main,
  },
  icon: {
    color: theme.palette.light.main,
  },
}));
