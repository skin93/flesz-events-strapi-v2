import React from 'react';
import Router, { useRouter } from 'next/router';
import PropTypes from 'prop-types';

import * as gtag from '@/lib/gtag';

import useSWR from 'swr';
import { client } from '@/lib/requestClient';
import { ALL_CATEGORIES_QUERY } from '@/lib/queries/categories/allCategoriesQuery';

import theme from '../theme';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { CircularProgress, Container } from '@material-ui/core';

import TheHeader from '@/components/layout/TheHeader';
import TheFooter from '@/components/layout/TheFooter';

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

  const q = ALL_CATEGORIES_QUERY;

  const fetcher = async (query) => await client.request(query);

  const { error, data } = useSWR(q, fetcher, {
    initialData: props.data,
  });

  if (!data && !error) {
    return (
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}>
        <CircularProgress
          style={{ color: '#32e0c4', width: '75px', height: '75px' }}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <p>Coś poszło nie tak...</p>
      </div>
    );
  }

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
          <TheHeader categories={data?.categories} />
          <Container
            maxWidth='lg'
            component='main'
            key={router.asPath}
            style={{
              margin: '30px auto',
              overflow: 'hidden',
            }}>
            <Component {...pageProps} />
          </Container>
          <TheFooter />
        </div>
      </ThemeProvider>
    </React.Fragment>
  );
}

export async function getServerSideProps() {
  const data = await client.request(ALL_CATEGORIES_QUERY);

  return {
    props: { data },
  };
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
