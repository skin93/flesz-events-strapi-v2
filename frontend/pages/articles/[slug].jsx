import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";

import clsx from "clsx";
import { fetcher } from "@/lib/fetcher";
import { SINGLE_ARTICLE_QUERY } from "@/lib/queries/articles/singleArticleQuery";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import Divider from "@material-ui/core/Divider";

import SEO from "@/components/SEO";
import RelatedArticles from "@/components/layout/RelatedArticles";

import { getMediaUrl } from "@/lib/getMediaUrl";
import Disqus from "@/components/Disqus";

const ArticlePage = ({ data }) => {
  const classes = useStyles();

  const article = data?.articles[0];

  return (
    <Fragment>
      <SEO
        meta_title={article.metadata.meta_title}
        og_title={article.metadata.og_title}
        meta_description={article.metadata.meta_description}
        og_description={article.metadata.og_description}
        og_locale={article.metadata.og_locale}
        og_type={article.metadata.og_type}
        share_image={article.metadata.share_image}
        width={article.metadata.share_image.media.width}
        height={article.metadata.share_image.media.height}
        follow={article.metadata.follow}
        keywords={article.metadata.keywords}
        index={article.metadata.index}
      />
      <Container
        component="section"
        maxWidth="lg"
        aria-label="article-page"
        style={{ flexGrow: 1, padding: "15px" }}
      >
        <div className={classes.chips}>
          <Link href={`/categories/${article.category.slug}`}>
            <a>
              <Chip
                variant="outlined"
                label={article.category.name}
                className={clsx(classes.category, classes.chip)}
              />
            </a>
          </Link>
          {article.tags.map((tag) => (
            <Link key={tag.slug} href={`/tags/${tag.slug}`}>
              <a>
                <Chip
                  key={tag.name}
                  label={tag.name}
                  className={clsx(classes.tag, classes.chip)}
                  variant="outlined"
                />
              </a>
            </Link>
          ))}
          {article.published_at === null ? (
            <Chip
              label={article.createdAt.split("T")[0]}
              className={clsx(classes.published_at, classes.chip)}
              variant="outlined"
            />
          ) : (
            <Chip
              label={article.published_at.split("T")[0]}
              className={clsx(classes.published_at, classes.chip)}
              variant="outlined"
            />
          )}

          {article.writers.map((writer) => (
            <Chip
              label={writer.name}
              key={writer.name}
              className={clsx(classes.writer, classes.chip)}
              variant="outlined"
            />
          ))}
        </div>
        <Typography
          variant="h1"
          aria-label="article-title"
          className={classes.title}
        >
          {article.title}
        </Typography>
        <Divider className={classes.divider} />
        <Grid container justifyContent="space-between">
          <Grid item xs={12} lg={8} component="article">
            <div className={classes.imageWrapper}>
              <Image
                src={getMediaUrl(article.image_cover)}
                quality={100}
                width={16}
                height={9}
                priority={true}
                layout="responsive"
                objectFit="cover"
                objectPosition="center"
                blurDataURL={getMediaUrl(article.image_cover)}
                alt={article.title}
                aria-label="article-cover"
              />
              <Typography
                variant="caption"
                className={classes.caption}
                aria-label="article-image-caption"
              >
                {article.image_cover.caption}
              </Typography>
            </div>

            <Typography
              variant="subtitle1"
              className={classes.excerpt}
              aria-label="article-excerpt"
            >
              {article.excerpt}
            </Typography>
            <Divider className={classes.divider} />
            <div
              dangerouslySetInnerHTML={{
                __html: article.content,
              }}
              aria-label="article-content"
            />
            <Divider className={classes.divider} />
            <Disqus article={article} />
          </Grid>
          <Grid
            item
            xs={12}
            lg={4}
            container
            spacing={2}
            justifyContent="center"
            component="aside"
          >
            {article.related_articles && (
              <RelatedArticles articles={article.related_articles.articles} />
            )}
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};

export default ArticlePage;

export async function getServerSideProps(context) {
  const previewMode = context.preview == true ? "PREVIEW" : "LIVE";
  const slug = context.params.slug;
  try {
    const data = await fetcher(SINGLE_ARTICLE_QUERY, {
      slug,
      previewMode,
    });

    if (!data) {
      return { notFound: true };
    }

    return {
      props: { data },
    };
  } catch (error) {
    return { notFound: true };
  }
}

const useStyles = makeStyles((theme) => ({
  chips: {
    marginTop: "1rem",
  },
  chip: {
    marginBottom: "1rem",
  },
  imageWrapper: {
    position: "relative",
    boxShadow: "rgba(0, 0, 0, 0.7) 0px 5px 15px",
  },
  caption: {
    display: "inline-block",
    position: "absolute",
    bottom: 0,
    left: 0,
    background: theme.palette.black.main,
    color: theme.palette.light.main,
    fontWeight: 600,
  },
  title: {
    fontWeight: 600,
    margin: "0 0 1rem 0",
  },
  excerpt: {
    fontWeight: 600,
    color: theme.palette.light.main,
    margin: "1rem 0",
  },
  category: {
    color: theme.palette.accent.main,
    cursor: "pointer",
    textTransform: "uppercase",
    marginRight: "10px",
    borderRadius: "0px",
    borderColor: theme.palette.accent.main,
  },
  tag: {
    cursor: "pointer",
    textTransform: "uppercase",
    marginRight: "10px",

    borderRadius: "0px",
    color: theme.palette.light.main,
    borderColor: theme.palette.light.main,
  },
  published_at: {
    borderColor: theme.palette.muted.darker,
    marginRight: "10px",

    borderRadius: "0px",
  },
  writer: {
    borderColor: theme.palette.muted.darker,
    borderRadius: "0px",
  },
  divider: {
    margin: "1rem 0",
    height: "3px",
    backgroundColor: theme.palette.muted.main,
    "&:first-of-type": {
      marginTop: "0",
    },
  },
}));
