import React, { useState, useEffect, useCallback } from 'react';

import dynamic from 'next/dynamic';
import Link from 'next/link';

import useSWR from 'swr';
import { client } from '@/lib/requestClient';
import { ALL_ARTICLES_QUERY } from '@/lib/queries/articles/allArticlesQuery';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Fade from '@material-ui/core/Fade';

import BaseCard from '@/components/UI/BaseCard';
import SEO from '@/components/SEO';
import LoadMoreButton from '@/components/UI/LoadMoreButton';
const SkeletonCard = dynamic(() => import('@/components/UI/SkeletonCard'));

export default function Home(props) {
  const classes = useStyles();

  const [limit] = useState(90);
  const [start] = useState(0);
  const [articlesPerPage] = useState(9);
  const [articlesToShow, setArticlesToShow] = useState([]);
  const [next, setNext] = useState(articlesPerPage);

  const fetcher = async (query) =>
    await client.request(query, { start, limit });

  const q = ALL_ARTICLES_QUERY;

  const { error, data } = useSWR([q, start, limit], fetcher, {
    initialData: props.data,
  });

  const loopWithSlice = useCallback(
    (start, end) => {
      const slicedArticles = data.articles.slice(start, end);
      setArticlesToShow((prev) => [...prev, ...slicedArticles]);
    },
    [data]
  );

  useEffect(() => {
    loopWithSlice(0, articlesPerPage);
  }, [loopWithSlice, articlesPerPage]);

  const handleShowMoreArticles = useCallback(() => {
    loopWithSlice(next, next + articlesPerPage);
    setNext(next + articlesPerPage);
  }, [next, articlesPerPage, loopWithSlice]);

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
        <section className={classes.root} aria-label='home-page'>
          <Typography variant='h6' component='h1' className={classes.heading}>
            OSTATNIE WPISY
          </Typography>
          <Grid container spacing={2} className={classes.container}>
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
          <LoadMoreButton
            next={next}
            count={data.articlesConnection.aggregate.count}
            onClick={handleShowMoreArticles}
          />
        </section>
      </Fade>
    </React.Fragment>
  );
}

export async function getServerSideProps() {
  const data = await client.request(ALL_ARTICLES_QUERY, {
    start: 0,
    limit: 90,
  });

  return {
    props: { data },
  };
}

const useStyles = makeStyles((theme) => ({
  root: { padding: '15px' },
  heading: {
    textAlign: 'center',
    color: theme.palette.light.main,
  },
  container: {
    marginTop: '30px',
  },
}));
