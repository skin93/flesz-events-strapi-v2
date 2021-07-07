import React, { useState, useCallback } from 'react';

import Link from 'next/link';

import useSWR from 'swr';
import { request } from 'graphql-request';
import { ALL_ARTICLES_QUERY } from '@/lib/queries/articles/allArticlesQuery';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Fade from '@material-ui/core/Fade';

import SkeletonCard from '@/components/UI/SkeletonCard';
import BaseCard from '@/components/UI/BaseCard';
import SEO from '@/components/SEO';
import LoadMoreButton from '@/components/UI/LoadMoreButton';

export default function Home(props) {
  const classes = useStyles();

  const [start, setStart] = useState(0);
  const [limit, setLimit] = useState(6);

  const handleClick = () => {
    setLimit((prev) => prev + 3);
  };

  const fetcher = (query, start, limit) => {
    return request(process.env.NEXT_PUBLIC_API_STRAPI, query, {
      start,
      limit,
    });
  };

  const q = ALL_ARTICLES_QUERY;

  const { error, data } = useSWR([q, start, limit], fetcher, {
    initialData: props.data,
  });

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
      <SEO />
      <section className={classes.root} aria-label='home-page'>
        <Typography variant='h6' component='h1' className={classes.heading}>
          OSTATNIE WPISY
        </Typography>
        <Grid container spacing={2} className={classes.container}>
          {data.articles.map((article) => (
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
          handleClick={handleClick}
          count={data.articlesConnection.aggregate.count}
          items={data.articles}
        />
      </section>
    </React.Fragment>
  );
}

export async function getServerSideProps() {
  const data = await request(
    process.env.NEXT_PUBLIC_API_STRAPI,
    ALL_ARTICLES_QUERY,
    {
      start: 0,
      limit: 6,
    }
  );

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
