import React from 'react';
import Link from 'next/link';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';

import RelatedCard from '@/components/UI/RelatedCard';

const RelatedArticles = ({ articles }) => {
  const classes = useStyles();

  if (!articles) {
    return <div>Loading...</div>;
  }

  return (
    <section className={classes.root} aria-label='related-articles'>
      <Typography variant='h6' component='h1' className={classes.heading}>
        Zobacz także:
      </Typography>
      <Grid
        container
        direction='row'
        justifyContent='center'
        spacing={2}
        className={classes.container}>
        {articles.map((article) => (
          <Grid item key={article.title} xs={12} sm={6} lg={12}>
            <Link href={`/articles/${article.slug}`}>
              <a>
                <RelatedCard article={article} />
              </a>
            </Link>
          </Grid>
        ))}
      </Grid>
    </section>
  );
};

export default RelatedArticles;

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '15px',
    width: '100%',
  },
  heading: {
    textAlign: 'left',
    color: theme.palette.light.main,
  },
  container: {
    marginTop: '30px',
  },
}));
