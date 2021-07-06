import React from 'react';

import Link from 'next/link';

import useSWR from 'swr';
import { request } from 'graphql-request';
import { ALL_ARTICLES_QUERY } from '@/lib/queries/articles/allArticlesQuery';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import SkeletonCard from '@/components/UI/SkeletonCard';
import BaseCard from '@/components/UI/BaseCard';

export default function Home(props) {
  const classes = useStyles();

  const [start, setStart] = React.useState(0);
  const [limit, setLimit] = React.useState(6);

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
    <section className={classes.root} aria-label='home-page'>
      <Typography variant='h6' component='h1' className={classes.heading}>
        OSTATNIE WPISY
      </Typography>
      <Grid container spacing={2} className={classes.container}>
        {data.articles.map((article) => (
          <Grid item xs={12} sm={6} md={4} key={article.id}>
            <Link href={`/articles/${article.slug}`}>
              <a>
                <BaseCard article={article} />
              </a>
            </Link>
          </Grid>
        ))}
      </Grid>
    </section>
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
