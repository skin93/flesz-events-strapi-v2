import { useState, useCallback } from "react";

import { useRouter } from "next/router";
import Link from "next/link";

import { makeStyles } from "@material-ui/core/styles";

import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";

import FacebookIcon from "@material-ui/icons/Facebook";

import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import LinkButton from "@/components/UI/LinkButton";

const SiteDrawer = ({ navLinks, items }) => {
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
      <nav aria-labelledby="main navigation" className={classes.navbar}>
        {navLinks.map(({ title, path }) => (
          <LinkButton key={title} href={path} title={title} />
        ))}
        <Divider />
        {items.map(({ title, path }) => (
          <LinkButton key={title} href={path} title={title} />
        ))}
        <Link href="https://facebook.com/flesz.events" passHref>
          <Button className={classes.icon}>
            <FacebookIcon />
          </Button>
        </Link>
      </nav>
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
  navbar: {
    width: 250,
    display: "flex",
    flexDirection: "column",
    // alignItems: "flex-start",
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
    "& > .MuiButton-label": {
      justifyContent: "flex-start",
    },
  },
}));
