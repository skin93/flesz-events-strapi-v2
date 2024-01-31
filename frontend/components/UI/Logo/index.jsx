import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Link from "next/link";

const Logo = () => {
  const classes = useStyles();
  return (
    <div className={classes.navbarBrand} color="inherit" aria-label="home">
      <Link href="/">
        <img src="/FE_1_baner.svg" className={classes.logo} alt="logo" />
      </Link>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
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
}));

export default Logo;
