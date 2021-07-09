import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import useSWR from 'swr';
import { request } from 'graphql-request';
import { PREVIEW_ARTICLE_QUERY } from '@/lib/queries/articles/previewArticleQuery';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Fade from '@material-ui/core/Fade';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import Skeleton from '@material-ui/lab/Skeleton';

import SEO from '@/components/SEO';
import RelatedArticles from '@/components/layout/RelatedArticles';

import { getMediaUrl } from '@/lib/getMediaUrl';

const PreviewArticlePage = (props) => {
  const router = useRouter();
  const id = router.query.id;
  const classes = useStyles();

  const q = PREVIEW_ARTICLE_QUERY;

  const fetcher = (query, id) =>
    request(process.env.NEXT_PUBLIC_API_STRAPI, query, { id });

  const { error, data } = useSWR([q, id], fetcher, {
    initialData: props.data,
  });

  const { article } = data;

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
        meta_title={article.metadata.meta_title}
        meta_description={article.metadata.meta_description}
        share_image={article.metadata.share_image}
      />
      <Fade in timeout={200}>
        <section
          aria-label='post-page'
          style={{ flexGrow: 1, padding: '15px' }}>
          <div style={{ margin: '0 0 30px 0' }}>
            <Link href={`/categories/${article.category.slug}`}>
              <a>
                <Chip
                  variant='outlined'
                  label={article.category.name}
                  className={classes.category}
                />
              </a>
            </Link>
            {article.tags.map((tag) => (
              <Link key={tag.slug} href={`/tags/${tag.slug}`}>
                <a>
                  <Chip
                    key={tag.name}
                    label={tag.name}
                    className={classes.tagItem}
                    variant='outlined'
                  />
                </a>
              </Link>
            ))}
            <Chip
              label={article.updatedAt.split('T')[0]}
              className={classes.updatedAt}
              variant='outlined'
            />
            {article.writers.map((writer) => (
              <Chip
                label={writer.name}
                key={writer.name}
                className={classes.writer}
                variant='outlined'
              />
            ))}
          </div>
          <Typography
            variant='h3'
            component='h1'
            aria-label='article-title'
            className={classes.title}>
            {article.title}
          </Typography>
          <Divider className={classes.divider} />
          <Grid container justifyContent='space-between'>
            <Grid item xs={12} lg={8} component='article'>
              <Grid container>
                <Grid item>
                  <Image
                    src={getMediaUrl(article.image_cover)}
                    width={800}
                    height={450}
                    quality={100}
                    layout='responsive'
                    alt={article.title}
                    aria-label='article-cover'
                  />
                  <Typography
                    variant='subtitle2'
                    className={classes.coverSrc}
                    aria-label='article-cover-src'>
                    {article.image_cover.caption}
                  </Typography>
                  <Typography
                    variant='subtitle1'
                    className={classes.excerpt}
                    aria-label='article-excerpt'>
                    {article.excerpt}
                  </Typography>
                  <Divider className={classes.divider} />
                  <div
                    dangerouslySetInnerHTML={{ __html: article.content }}
                    className={classes.content}
                    aria-label='article-content'
                  />
                  <Divider className={classes.divider} />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} lg={1} />
            <Grid
              item
              xs={12}
              lg={3}
              container
              spacing={2}
              justifyContent='center'
              component='aside'>
              {article.related_articles && (
                <RelatedArticles articles={article.related_articles.articles} />
              )}
            </Grid>
          </Grid>
        </section>
      </Fade>
    </React.Fragment>
  );
};

export default PreviewArticlePage;

export async function getServerSideProps({ params }) {
  const data = await request(
    process.env.NEXT_PUBLIC_API_STRAPI,
    PREVIEW_ARTICLE_QUERY,
    {
      id: params.id,
    }
  );

  return {
    props: { data },
  };
}

const useStyles = makeStyles((theme) => ({
  chips: {
    margin: '0 0 30px 0',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 'calc(1.1rem + 2vw)',
  },
  excerpt: {
    fontSize: 'calc(.7rem + .5vw)',
    fontWeight: 'bold',
    color: theme.palette.light.main,
    margin: '30px 0',
  },
  coverSrc: {
    color: theme.palette.muted.main,
    fontWeight: 'bold',
  },
  category: {
    color: theme.palette.accent.main,
    cursor: 'pointer',
    textTransform: 'uppercase',
    marginRight: '10px',
    fontSize: 'calc(.7em + .2vw)',
    borderRadius: '0px',
    borderColor: theme.palette.accent.main,
  },
  tagItem: {
    cursor: 'pointer',
    textTransform: 'uppercase',
    marginRight: '10px',
    fontSize: 'calc(.7em + .2vw)',
    borderRadius: '0px',
    color: theme.palette.light.main,
    borderColor: theme.palette.light.main,
  },
  updatedAt: {
    borderColor: theme.palette.muted.darker,
    marginRight: '10px',
    fontSize: 'calc(.7em + .2vw)',
    borderRadius: '0px',
  },
  writer: {
    borderColor: theme.palette.muted.darker,
    borderRadius: '0px',
    fontSize: 'calc(.7em + .2vw)',
  },
  divider: {
    margin: '30px 0',
    height: '3px',
    backgroundColor: theme.palette.muted.main,
  },
}));
