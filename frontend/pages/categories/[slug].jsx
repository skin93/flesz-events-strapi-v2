import React from 'react';

import Link from 'next/link';

import { useRouter } from 'next/router';

import useSWR from 'swr';
import { request } from 'graphql-request';
import { SINGLE_CATEGORY_QUERY } from '@/lib/queries/categories/singleCategoryQuery';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Fade from '@material-ui/core/Fade';

import BaseCard from '@/components/UI/BaseCard';
import SkeletonCard from '@/components/UI/SkeletonCard';
import SEO from '@/components/SEO';

const CategoryPage = (props) => {
  const router = useRouter();
  const slug = router.query.slug;
  const classes = useStyles();

  const q = SINGLE_CATEGORY_QUERY;

  const fetcher = (query, slug) =>
    request(process.env.NEXT_PUBLIC_API_STRAPI, query, { slug });

  const { error, data } = useSWR([q, slug], fetcher, {
    initialData: props.data,
  });

  const { categories } = data;
  const category = categories[0];

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
      <Grid container spacing={2}>
        {[0, 1, 2, 3, 4, 5].map((x) => (
          <Grid item key={x} xs={12} sm={6} md={4}>
            <SkeletonCard />
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <React.Fragment>
      <SEO
        meta_title={category.metadata.meta_title}
        meta_description={category.metadata.meta_description}
        share_image={category.metadata.share_image}
      />
      <Fade in timeout={200}>
        <section style={{ padding: '15px' }} aria-label='category-page'>
          <Typography variant='h6' className={classes.heading}>
            <span>#</span>
            {category.name}
          </Typography>
          {category.articles.length > 0 ? (
            <Grid container spacing={2} className={classes.container}>
              {category.articles.map((article) => (
                <Fade key={article.id} in timeout={200}>
                  <Grid item xs={12} sm={6} md={4}>
                    <Link href={`/articles/${article.slug}`}>
                      <a>
                        <BaseCard article={article} />
                      </a>
                    </Link>
                  </Grid>
                </Fade>
              ))}
            </Grid>
          ) : (
            <div>Brak artykułów</div>
          )}
        </section>
      </Fade>
    </React.Fragment>
  );
};

export default CategoryPage;

export async function getServerSideProps({ params }) {
  const data = await request(
    process.env.NEXT_PUBLIC_API_STRAPI,
    SINGLE_CATEGORY_QUERY,
    {
      slug: params.slug,
    }
  );

  return {
    props: { data },
  };
}

const useStyles = makeStyles((theme) => ({
  heading: {
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    color: theme.palette.light.main,
    '& span': {
      color: theme.palette.accent.main,
    },
  },
  container: {
    marginTop: '30px',
  },
  loadMoreButton: {
    display: 'block',
    margin: '30px auto',
    fontWeight: 'bold',
    color: theme.palette.accent.main,
  },
}));
