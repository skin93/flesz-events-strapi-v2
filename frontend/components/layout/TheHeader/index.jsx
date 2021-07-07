import React from 'react';
import Image from 'next/image';

import { useRouter } from 'next/router';
import Link from 'next/link';

import { makeStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Container from '@material-ui/core/Container';
import Hidden from '@material-ui/core/Hidden';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';

import SiteDrawer from '@/components/layout/SiteDrawer';

function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction='down' in={!trigger}>
      {children}
    </Slide>
  );
}

const navLinks = [
  { title: 'news', path: '/categories/news' },
  { title: 'festiwale', path: '/categories/festiwale' },
  { title: 'koncerty', path: '/categories/koncerty' },
];

const TheHeader = (props) => {
  const classes = useStyles();
  const router = useRouter();

  return (
    <>
      <HideOnScroll {...props}>
        <AppBar position='fixed' className={classes.appBar}>
          <Toolbar variant='dense' id='back-to-top-anchor'>
            <Container maxWidth='lg' className={classes.navbarDisplayFlex}>
              <div
                className={classes.navbarBrand}
                color='inherit'
                aria-label='home'>
                <Link href='/'>
                  <a>
                    <Image
                      src='/biale-logo-pelny-napis-akcent.png'
                      className={classes.logo}
                      alt='logo'
                      width={150}
                      height={20}
                    />
                  </a>
                </Link>
              </div>
              <Hidden smDown>
                <List
                  component='nav'
                  aria-label='main-navigation'
                  className={classes.navDisplayFlex}>
                  {navLinks.map(({ title, path }) => (
                    <Link href={path} key={title} passHref>
                      <a
                        className={
                          router.asPath === `${path}`
                            ? `${classes.active}`
                            : `${classes.linkText}`
                        }>
                        <ListItem button>
                          <ListItemText primary={title} />
                        </ListItem>
                      </a>
                    </Link>
                  ))}
                </List>
              </Hidden>
              <Hidden mdUp>
                <SiteDrawer navLinks={navLinks} />
              </Hidden>
            </Container>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <div className={classes.offset} />
    </>
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
    textAlign: 'center',
  },
  navbarDisplayFlex: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navbarBrand: {
    padding: `8px 16px`,
    display: `flex`,
    justifyContent: `flex-start`,
    alignItems: `center`,
  },
  logo: {
    display: `flex`,
    justifyContent: `center`,
    alignItems: `center`,
  },
  navDisplayFlex: {
    display: `flex`,
    justifyContent: `space-between`,
  },
  active: {
    textDecoration: `none`,
    textTransform: `uppercase`,
    color: theme.palette.accent.main,
  },
  linkText: {
    textDecoration: `none`,
    textTransform: `uppercase`,
    color: theme.palette.light.main,
  },
}));
