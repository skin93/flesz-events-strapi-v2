import React from 'react';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import clsx from 'clsx';

import useSWR from 'swr';
import { request } from 'graphql-request';
import { SINGLE_ARTICLE_QUERY } from '@/lib/queries/articles/singleArticleQuery';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Fade from '@material-ui/core/Fade';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
const Skeleton = dynamic(() => import('@material-ui/lab/Skeleton'));

import SEO from '@/components/SEO';
import RelatedArticles from '@/components/layout/RelatedArticles';

import { getMediaUrl } from '@/lib/getMediaUrl';
import Disqus from '@/components/Disqus';

const ArticlePage = (props) => {
  const router = useRouter();
  const slug = router.query.slug;
  const classes = useStyles();

  const q = SINGLE_ARTICLE_QUERY;

  const fetcher = (query, slug) =>
    request(process.env.NEXT_PUBLIC_API_STRAPI, query, { slug });

  const { error, data } = useSWR([q, slug], fetcher, {
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
      <div>
        <Skeleton variant='rect' width={800} height={50} />
        <Skeleton variant='text' width={800} />
        <Skeleton variant='rect' width={800} />
        <Skeleton variant='rect' width={800} height={450} />
        <Skeleton variant='text' width={800} />
        <Skeleton variant='text' width={800} />
        <Skeleton variant='rect' width={800} height={200} />
        <Skeleton variant='text' width={800} />
      </div>
    );
  }

  return (
    <React.Fragment>
      <SEO
        meta_title={data.articles[0].metadata.meta_title}
        meta_description={data.articles[0].metadata.meta_description}
        share_image={data.articles[0].metadata.share_image}
        follow={data.articles[0].metadata.follow}
        keywords={data.articles[0].metadata.keywords}
        index={data.articles[0].metadata.index}
      />
      <Fade in timeout={200}>
        <Container
          component='section'
          maxWidth='lg'
          aria-label='article-page'
          style={{ flexGrow: 1, padding: '15px' }}>
          <div className={classes.chips}>
            <Link href={`/categories/${data.articles[0].category.slug}`}>
              <a>
                <Chip
                  variant='outlined'
                  label={data.articles[0].category.name}
                  className={clsx(classes.category, classes.chip)}
                />
              </a>
            </Link>
            {data.articles[0].tags.map((tag) => (
              <Link key={tag.slug} href={`/tags/${tag.slug}`}>
                <a>
                  <Chip
                    key={tag.name}
                    label={tag.name}
                    className={clsx(classes.tag, classes.chip)}
                    variant='outlined'
                  />
                </a>
              </Link>
            ))}
            <Chip
              label={data.articles[0].published_at.split('T')[0]}
              className={clsx(classes.published_at, classes.chip)}
              variant='outlined'
            />
            {data.articles[0].writers.map((writer) => (
              <Chip
                label={writer.name}
                key={writer.name}
                className={clsx(classes.writer, classes.chip)}
                variant='outlined'
              />
            ))}
          </div>
          <Typography
            component='h1'
            aria-label='article-title'
            className={classes.title}>
            {data.articles[0].title}
          </Typography>
          <Divider className={classes.divider} />
          <Grid container justifyContent='space-between'>
            <Grid item xs={12} lg={8} component='article'>
              <div className={classes.imageWrapper}>
                <Image
                  src={getMediaUrl(data.articles[0].image_cover)}
                  width={800}
                  height={450}
                  layout='responsive'
                  objectFit='cover'
                  objectPosition='center top'
                  alt={data.articles[0].title}
                  aria-label='article-cover'
                  className={classes.image}
                />
                <Typography
                  className={classes.caption}
                  aria-label='article-image-caption'>
                  {data.articles[0].image_cover.caption}
                </Typography>
              </div>

              <Typography
                className={classes.excerpt}
                aria-label='article-excerpt'>
                {data.articles[0].excerpt}
              </Typography>
              <Divider className={classes.divider} />
              <div
                dangerouslySetInnerHTML={{
                  __html: data.articles[0].content,
                }}
                aria-label='article-content'
              />
              <Divider className={classes.divider} />
              <Disqus article={data.articles[0]} />
            </Grid>
            <Grid
              item
              xs={12}
              lg={4}
              container
              spacing={2}
              justifyContent='center'
              component='aside'>
              {data.articles[0].related_articles && (
                <RelatedArticles
                  articles={data.articles[0].related_articles.articles}
                />
              )}
            </Grid>
          </Grid>
        </Container>
      </Fade>
    </React.Fragment>
  );
};

export default ArticlePage;

export async function getServerSideProps({ params }) {
  const data = await request(
    process.env.NEXT_PUBLIC_API_STRAPI,
    SINGLE_ARTICLE_QUERY,
    {
      slug: params.slug,
    }
  );

  return {
    props: { data },
  };
}

const useStyles = makeStyles((theme) => ({
  chips: {
    marginTop: '1rem',
  },
  chip: {
    marginBottom: '1rem',
    fontSize: 'calc(.4rem + .4vw)',
  },
  imageWrapper: {
    position: 'relative',
    boxShadow: 'rgba(0, 0, 0, 0.7) 0px 5px 15px',
  },
  caption: {
    display: 'inline-block',
    position: 'absolute',
    bottom: 0,
    left: 0,
    background: theme.palette.black.main,
    color: theme.palette.light.main,
    fontWeight: 600,
    fontSize: 'calc(.4rem + .4vw)',
  },
  title: {
    fontWeight: 600,
    fontSize: 'calc(2rem + .8vw)',
  },
  excerpt: {
    fontWeight: 600,
    color: theme.palette.light.main,
    margin: '30px 0',
    fontSize: 'calc(.8rem + .5vw)',
  },
  category: {
    color: theme.palette.accent.main,
    cursor: 'pointer',
    textTransform: 'uppercase',
    marginRight: '10px',
    borderRadius: '0px',
    borderColor: theme.palette.accent.main,
  },
  tag: {
    cursor: 'pointer',
    textTransform: 'uppercase',
    marginRight: '10px',

    borderRadius: '0px',
    color: theme.palette.light.main,
    borderColor: theme.palette.light.main,
  },
  published_at: {
    borderColor: theme.palette.muted.darker,
    marginRight: '10px',

    borderRadius: '0px',
  },
  writer: {
    borderColor: theme.palette.muted.darker,
    borderRadius: '0px',
  },
  divider: {
    margin: '30px 0',
    height: '3px',
    backgroundColor: theme.palette.muted.main,
  },
}));
