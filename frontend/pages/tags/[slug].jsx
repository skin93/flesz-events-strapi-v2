import React, { useState, useEffect } from 'react';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';

import useSWR from 'swr';
import { client } from '@/lib/requestClient';
import { SINGLE_TAG_QUERY } from '@/lib/queries/tags/singleTagQuery';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Fade from '@material-ui/core/Fade';

import SEO from '@/components/SEO';
import BaseCard from '@/components/UI/BaseCard';
import LoadMoreButton from '@/components/UI/LoadMoreButton';
const SkeletonCard = dynamic(() => import('@/components/UI/SkeletonCard'));

const TagPage = (props) => {
  const router = useRouter();
  const slug = router.query.slug;
  const classes = useStyles();

  const [articlesPerPage] = useState(9);
  const [articlesToShow, setArticlesToShow] = useState([]);
  const [next, setNext] = useState(articlesPerPage);

  const q = SINGLE_TAG_QUERY;

  const fetcher = async (query, slug) => await client.request(query, { slug });

  const { error, data } = useSWR([q, slug], fetcher, {
    initialData: props.data,
  });

  const loopWithSlice = useCallback(
    (start, end) => {
      const slicedArticles = data.tags[0].articles.slice(start, end);
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
  }, [loopWithSlice, next, articlesPerPage]);

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
        meta_title={data.tags[0].metadata.meta_title}
        meta_description={data.tags[0].metadata.meta_description}
        share_image={data.tags[0].metadata.share_image}
        keywords={data.tags[0].metadata.keywords}
        index={data.tags[0].metadata.index}
        follow={data.tags[0].metadata.follow}
      />
      <Fade in timeout={200}>
        <section style={{ padding: '15px' }} aria-label='tag-page'>
          {articlesToShow.length > 0 ? (
            <React.Fragment>
              <Typography variant='h6' className={classes.heading}>
                <span>#</span>
                {data.tags[0].name}
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
          {data.tags[0].articles.length > 0 && (
            <LoadMoreButton
              next={next}
              count={data.tags[0].articles.length}
              onClick={handleShowMoreArticles}
            />
          )}
        </section>
      </Fade>
    </React.Fragment>
  );
};

export default TagPage;

export async function getServerSideProps({ params }) {
  const data = await client.request(SINGLE_TAG_QUERY, {
    slug: params.slug,
  });

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
