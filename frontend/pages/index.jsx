import React, { useState, useEffect, useCallback } from 'react';

import dynamic from 'next/dynamic';
import Link from 'next/link';

import useSWR from 'swr';
import { client } from '@/lib/requestClient';
import { ALL_ARTICLES_QUERY } from '@/lib/queries/articles/allArticlesQuery';

import InfiniteScroll from 'react-infinite-scroll-component';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Fade from '@material-ui/core/Fade';

import BaseCard from '@/components/UI/BaseCard';
import SEO from '@/components/SEO';
import LoadMoreButton from '@/components/UI/LoadMoreButton';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
const SkeletonCard = dynamic(() => import('@/components/UI/SkeletonCard'));

export default function Home(props) {
  const classes = useStyles();

  const [limit] = useState(9);
  const [start, setStart] = useState(0);

  const [articlesToShow, setArticlesToShow] = useState(props.data.articles);
  const [hasMore, setHasMore] = useState(true);

  const fetcher = async (query) =>
    await client.request(query, { start, limit });

  const q = ALL_ARTICLES_QUERY;

  const { error, data } = useSWR([q, start, limit], fetcher, {
    initialData: props.data,
  });

  const getMoreArticles = useCallback(async () => {
    const res = await client.request(ALL_ARTICLES_QUERY, {
      start: articlesToShow.length,
      limit: 3,
    });

    setArticlesToShow((articlesToShow) => [...articlesToShow, ...res.articles]);
  }, [articlesToShow]);

  useEffect(() => {
    setHasMore(
      data.articlesConnection.aggregate.count > articlesToShow.length
        ? true
        : false
    );
  }, [articlesToShow]);

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

  if (!data) {
    return (
      <Grid container spacing={2} className={classes.container}>
        {[0, 1, 2, 3, 4, 5].map((x) => (
          <Grid item xs={12} md={4} key={x}>
            <SkeletonCard />
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <React.Fragment>
      <SEO index={true} />
      <Fade in timeout={200}>
        <Container
          component='section'
          maxWidth='lg'
          className={classes.root}
          aria-label='home-page'>
          <Typography component='h1' className={classes.heading}>
            OSTATNIE WPISY
          </Typography>

          <InfiniteScroll
            scrollThreshold={0.8}
            style={{ overflow: 'hidden' }}
            dataLength={articlesToShow.length}
            next={getMoreArticles}
            hasMore={hasMore}
            loader={
              <div className={classes.block}>
                <CircularProgress />
              </div>
            }
            endMessage={
              <div className={classes.block}>
                <p className={classes.endMessage}>Nic więcej nie ma</p>
              </div>
            }>
            <Grid style={{ marginBottom: '3rem' }} container spacing={2}>
              {articlesToShow.map((article) => (
                <Fade key={article.id} in timeout={200}>
                  <Grid item xs={12} sm={6} md={4}>
                    <Link href={`/articles/${article.slug}`} passHref>
                      <a>
                        <BaseCard article={article} />
                      </a>
                    </Link>
                  </Grid>
                </Fade>
              ))}
            </Grid>
          </InfiniteScroll>
        </Container>
      </Fade>
    </React.Fragment>
  );
}

export async function getServerSideProps() {
  const data = await client.request(ALL_ARTICLES_QUERY, {
    start: 0,
    limit: 9,
  });

  return {
    props: { data },
  };
}

const useStyles = makeStyles((theme) => ({
  heading: {
    textAlign: 'center',
    color: theme.palette.light.main,
    margin: '3rem 0',
    fontWeight: 600,
    fontSize: 'calc(2rem + .8vw)',
    textTransform: 'uppercase',
  },
  block: {
    display: 'flex',
    justifyContent: 'center',
    margin: '3rem 0',
  },
  endMessage: {
    margin: 0,
    color: theme.palette.text.disabled,
  },
}));
