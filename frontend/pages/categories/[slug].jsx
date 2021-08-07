import React, { useState, useEffect, useCallback } from 'react';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import useSWR from 'swr';
import { client } from '@/lib/requestClient';
import { SINGLE_CATEGORY_QUERY } from '@/lib/queries/categories/singleCategoryQuery';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Fade from '@material-ui/core/Fade';

import SEO from '@/components/SEO';
import BaseCard from '@/components/UI/BaseCard';
import LoadMoreButton from '@/components/UI/LoadMoreButton';
const SkeletonCard = dynamic(() => import('@/components/UI/SkeletonCard'));

const CategoryPage = (props) => {
  const router = useRouter();
  const slug = router.query.slug;
  const classes = useStyles();

  const [articlesPerPage] = useState(9);
  const [articlesToShow, setArticlesToShow] = useState([]);
  const [next, setNext] = useState(articlesPerPage);

  const q = SINGLE_CATEGORY_QUERY;

  const fetcher = async (query, slug) => await client.request(query, { slug });

  const { error, data } = useSWR([q, slug], fetcher, {
    initialData: props.data,
  });

  const loopWithSlice = useCallback(
    (start, end) => {
      const slicedArticles = data.categories[0].articles.slice(start, end);
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
        meta_title={data.categories[0].metadata.meta_title}
        meta_description={data.categories[0].metadata.meta_description}
        share_image={data.categories[0].metadata.share_image}
        keywords={data.categories[0].metadata.keywords}
        index={data.categories[0].metadata.index}
        follow={data.categories[0].metadata.follow}
      />
      <Fade in timeout={200}>
        <Container component='section' maxWidth='lg' aria-label='category-page'>
          {articlesToShow.length > 0 ? (
            <React.Fragment>
              <Typography variant='h6' className={classes.heading}>
                <span>#</span>
                {data.categories[0].name}
              </Typography>
              <Grid container spacing={2} className={classes.container}>
                {articlesToShow.map((article) => (
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
            </React.Fragment>
          ) : (
            <div className={classes.noArticles}>
              <Typography variant='h1' className={classes.heading}>
                Nic tu nie ma...
              </Typography>
            </div>
          )}
          {data.categories[0].articles.length > 0 && (
            <LoadMoreButton
              next={next}
              count={data.categories[0].articles.length}
              onClick={handleShowMoreArticles}
            />
          )}
        </Container>
      </Fade>
    </React.Fragment>
  );
};

export default CategoryPage;

export async function getServerSideProps({ params }) {
  const data = await client.request(SINGLE_CATEGORY_QUERY, {
    slug: params.slug,
  });

  return {
    props: { data },
  };
}

const useStyles = makeStyles((theme) => ({
  heading: {
    margin: '30px 0',
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
  noArticles: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadMoreButton: {
    display: 'block',
    margin: '30px auto',
    fontWeight: 'bold',
    color: theme.palette.accent.main,
  },
}));
