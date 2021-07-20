import React from 'react';
import Router, { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';

import * as gtag from '@/lib/gtag';

import theme from '../theme';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Container } from '@material-ui/core';

import TheHeader from '@/components/layout/TheHeader';
import TheFooter from '@/components/layout/TheFooter';

const NextNProgress = dynamic(() => import('nextjs-progressbar'));

Router.events.on('routeChangeComplete', (url) => gtag.pageview(url));

export default function MyApp(props) {
  const router = useRouter();
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
          }}>
          <TheHeader />
          <Container
            maxWidth='lg'
            component='main'
            key={router.asPath}
            style={{
              margin: '30px auto',
              overflow: 'hidden',
            }}>
            <NextNProgress
              color='#32e0c4'
              startPosition={0.3}
              stopDelayMs={200}
              height={5}
              showOnShallow={true}
            />
            <Component {...pageProps} />
          </Container>
          <TheFooter />
        </div>
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
