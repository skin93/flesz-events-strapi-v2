import React, { useState, useEffect, useCallback } from 'react';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';

import useSWR from 'swr';
import { client } from '@/lib/requestClient';
import { SINGLE_TAG_QUERY } from '@/lib/queries/tags/singleTagQuery';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Fade from '@material-ui/core/Fade';

import SEO from '@/components/SEO';
import BaseCard from '@/components/UI/BaseCard';
import LoadMoreButton from '@/components/UI/LoadMoreButton';
import { getMediaUrl } from '@/lib/getMediaUrl';
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
        <Container component='section' maxWidth='lg' aria-label='tag-page'>
          {articlesToShow.length > 0 ? (
            <React.Fragment>
              <div className={classes.head}>
                <div className={classes.overlay} />
                <Image
                  className={classes.tagImage}
                  priority
                  src={getMediaUrl(data.tags[0].metadata.share_image.media)}
                  layout='fill'
                  objectFit='cover'
                  alt={data.tags[0].name}
                  aria-label='article-cover'
                />
                <div className={classes.tagInfo}>
                  <Typography variant='h6' className={classes.tagTitle}>
                    {data.tags[0].name}
                  </Typography>
                </div>
              </div>

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
        </Container>
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
  head: {
    position: 'relative',
    margin: '0 auto',
    maxWidth: '100%',
    height: '450px',
    boxShadow: 'rgba(0, 0, 0, 0.7) 0px 5px 15px',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'black',
    opacity: 0.75,
    zIndex: 100,
  },
  tagImage: {},
  tagInfo: {
    position: 'absolute',
    bottom: '-5%',
    left: '50%',
    transform: 'translate(-50%, 5%)',
    zIndex: 100,
  },
  tagTitle: {
    borderRadius: '4px',
    background: theme.palette.black.main,
    padding: '5px 15px',
    border: `3px solid ${theme.palette.accent.main}`,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    color: theme.palette.light.main,
    '& span': {
      color: theme.palette.accent.main,
    },
  },
  container: {
    marginTop: '3rem',
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
