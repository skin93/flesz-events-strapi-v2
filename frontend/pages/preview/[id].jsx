import React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import clsx from 'clsx';

import useSWR from 'swr';
import { client } from '@/lib/requestClient';
import { PREVIEW_ARTICLE_QUERY } from '@/lib/queries/articles/previewArticleQuery';
import { getMediaUrl } from '@/lib/getMediaUrl';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Fade from '@material-ui/core/Fade';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';

import SEO from '@/components/SEO';
import RelatedArticles from '@/components/layout/RelatedArticles';
const Skeleton = dynamic(() => import('@material-ui/lab/Skeleton'));

const PreviewArticlePage = (props) => {
  const router = useRouter();
  const id = router.query.id;
  const classes = useStyles();

  const q = PREVIEW_ARTICLE_QUERY;

  const fetcher = async (query, id) => await client.request(query, { id });

  const { error, data } = useSWR([q, id], fetcher, {
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

  if (!data && !error) {
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
        meta_title={data.article.metadata.meta_title}
        meta_description={data.article.metadata.meta_description}
        share_image={data.article.metadata.share_image}
      />
      <Fade in timeout={200}>
        <Container
          component='section'
          maxWidth='lg'
          aria-label='post-page'
          style={{ flexGrow: 1, padding: '15px' }}>
          <div className={classes.chips}>
            <Link href={`/categories/${data.article.category.slug}`}>
              <a>
                <Chip
                  variant='outlined'
                  label={data.article.category.name}
                  className={clsx(classes.category, classes.chip)}
                />
              </a>
            </Link>
            {data.article.tags.map((tag) => (
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
              label={data.article.updatedAt.split('T')[0]}
              className={clsx(classes.updatedAt, classes.chip)}
              variant='outlined'
            />
            {data.article.writers.map((writer) => (
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
            {data.article.title}
          </Typography>
          <Divider className={classes.divider} />
          <Grid container justifyContent='space-between'>
            <Grid item xs={12} lg={8} component='article'>
              <div className={classes.imageWrapper}>
                <Image
                  src={getMediaUrl(data.article.image_cover)}
                  width={800}
                  height={450}
                  layout='responsive'
                  objectFit='cover'
                  objectPosition='center top'
                  alt={data.article.title}
                  aria-label='article-cover'
                />
                <Typography
                  className={classes.caption}
                  aria-label='article-cover-src'>
                  {data.article.image_cover.caption}
                </Typography>
              </div>

              <Typography
                className={classes.excerpt}
                aria-label='article-excerpt'>
                {data.article.excerpt}
              </Typography>
              <Divider className={classes.divider} />
              <div
                dangerouslySetInnerHTML={{ __html: data.article.content }}
                className={classes.content}
                aria-label='article-content'
              />
              <Divider className={classes.divider} />
            </Grid>
            <Grid
              item
              xs={12}
              lg={4}
              container
              spacing={2}
              justifyContent='center'
              component='aside'>
              {data.article.related_articles && (
                <RelatedArticles
                  articles={data.article.related_articles.articles}
                />
              )}
            </Grid>
          </Grid>
        </Container>
      </Fade>
    </React.Fragment>
  );
};

export default PreviewArticlePage;

export async function getServerSideProps({ params }) {
  const data = await client.request(PREVIEW_ARTICLE_QUERY, {
    id: params.id,
  });

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
    fontSize: 'calc(.5rem + .4vw)',
  },
  imageWrapper: {
    position: 'relative',
    boxShadow: 'rgba(0, 0, 0, 0.7) 0px 5px 15px',
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
  updatedAt: {
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
