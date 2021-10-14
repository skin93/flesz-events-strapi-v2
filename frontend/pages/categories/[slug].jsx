import React, { useState, useEffect, useCallback } from 'react';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';
import { SINGLE_CATEGORY_QUERY } from '@/lib/queries/categories/singleCategoryQuery';

import InfiniteScroll from 'react-infinite-scroll-component';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Fade from '@material-ui/core/Fade';

import SEO from '@/components/SEO';
import BaseCard from '@/components/UI/BaseCard';

const SkeletonCard = dynamic(() => import('@/components/UI/SkeletonCard'));

const CategoryPage = (props) => {
  const router = useRouter();
  const slug = router.query.slug;
  const classes = useStyles();

  const [limit] = useState(9);
  const [start, setStart] = useState(0);

  const [articlesToShow, setArticlesToShow] = useState(
    props.data.categories[0].articles
  );
  const [hasMore, setHasMore] = useState(true);

  const q = SINGLE_CATEGORY_QUERY;

  const { error, data } = useSWR([q, { slug, start, limit }], fetcher, {
    initialData: props.data,
  });

  const getMoreArticles = useCallback(async () => {
    const res = await fetcher(SINGLE_CATEGORY_QUERY, {
      start: articlesToShow.length,
      limit: 3,
      slug,
    });

    setArticlesToShow((articlesToShow) => [
      ...articlesToShow,
      ...res.categories[0].articles,
    ]);
  }, [articlesToShow, slug]);

  useEffect(() => {
    setHasMore(
      data.articlesCountBasedOnTagOrCategory > articlesToShow.length
        ? true
        : false
    );
  }, [articlesToShow, data.articlesCountBasedOnTagOrCategory]);

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
              <Typography component='h1' className={classes.heading}>
                {data.categories[0].name}
              </Typography>
              <InfiniteScroll
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
            </React.Fragment>
          ) : (
            <div className={classes.noArticles}>
              <Typography component='h1' className={classes.heading}>
                BRAK WPISÓW...
              </Typography>
            </div>
          )}
        </Container>
      </Fade>
    </React.Fragment>
  );
};

export default CategoryPage;

export async function getServerSideProps({ params }) {
  const data = await fetcher(SINGLE_CATEGORY_QUERY, {
    slug: params.slug,
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
  container: {
    marginTop: '30px',
  },
  noArticles: {
    display: 'flex',
    minHeight: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadMoreButton: {
    display: 'block',
    margin: '30px auto',
    fontWeight: 'bold',
    color: theme.palette.accent.main,
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
