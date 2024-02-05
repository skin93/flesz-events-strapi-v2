import { Fragment, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { NextSeo } from "next-seo";

import clsx from "clsx";
import { fetchWithArgs } from "@/lib/fetcher";
import { SINGLE_ARTICLE_QUERY } from "@/lib/queries/articles/singleArticleQuery";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import Divider from "@material-ui/core/Divider";
import Fade from "@material-ui/core/Fade";

import RelatedArticles from "@/components/layout/RelatedArticles";

import { getMediaUrl } from "@/lib/getMediaUrl";
import Disqus from "@/components/Disqus";

const ArticlePage = ({ data }) => {
  useEffect(() => {
    const fbIframes = document.querySelectorAll(".fb");
    fbIframes?.forEach((iframe) => {
      const iframeHeight = iframe.getAttribute("height");
      iframe.parentElement.style["height"] = `${iframeHeight}px`;
      iframe.parentElement.style["marginBlock"] = "1.5rem";
      iframe.parentElement.style["paddingTop"] = 0;
    });
  }, []);

  useEffect(() => {
    const instagramIframes = document.querySelectorAll(".instagram-media");
    instagramIframes?.forEach((iframe) => {
      const iframeHeight = iframe.getAttribute("height");
      // const iframeWidth = iframe.getAttribute("width");
      // iframe.parentElement.style["width"] = `${iframeWidth}px`;
      iframe.parentElement.style["height"] = `${iframeHeight}px`;
      iframe.parentElement.style["marginBlock"] = "1.5rem";
      iframe.parentElement.style["paddingTop"] = 0;
    });
  }, []);

  useEffect(() => {
    const figures = document.querySelectorAll(".image");
    figures?.forEach((figure) => {
      const image = figure.querySelector("img");
      const imageSrc = image.getAttribute("src");
      const newImageSrc = `${process.env.NEXT_PUBLIC_STRAPI}${imageSrc}`;
      image.setAttribute("src", newImageSrc);
    });
  }, []);

  const classes = useStyles();

  const article = data?.articles[0];

  return (
    <main>
      <NextSeo
        title={article.metadata.meta_title}
        description={article.metadata.meta_description}
        nofollow={!article.metadata.follow}
        noindex={!article.metadata.index}
        canonical={`${process.env.NEXT_PUBLIC_APP_DOMAIN}/articles/${article.slug}`}
        openGraph={{
          title: `${article.metadata.og_title} | ${process.env.NEXT_PUBLIC_APP_NAME}`,
          descirption: article.metadata.og_description,
          type: article.metadata.og_type,
          url: `${process.env.NEXT_PUBLIC_APP_DOMAIN}/articles/${article.slug}`,
          images: [
            {
              url: getMediaUrl(article.metadata.share_image.media),
              width: article.metadata.share_image.media.width,
              height: article.metadata.share_image.media.height,
              alt: article.metadata.share_image.media.alternativeText,
            },
          ],
        }}
      />
      <Fade in timeout={200}>
        <Container
          component="section"
          maxWidth="lg"
          style={{ marginTop: "16px" }}
          aria-label="article-page"
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
          <Grid
            className={classes.container}
            container
            justifyContent="space-between"
          >
            <Grid
              item
              xs={12}
              lg={7}
              component="article"
              className="left_column"
            >
              <div className={classes.imageWrapper}>
                <Image
                  src={getMediaUrl(article.image_cover)}
                  quality={50}
                  layout="fill"
                  priority
                  placeholder="blur"
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
              className={classes.rightColumn}
              container
              justifyContent="center"
              component="aside"
            >
              {article.related_articles && (
                <RelatedArticles articles={article.related_articles.articles} />
              )}
            </Grid>
          </Grid>
        </Container>
      </Fade>
    </main>
  );
};

export default ArticlePage;

export async function getServerSideProps(context) {
  const previewMode = context.preview == true ? "PREVIEW" : "LIVE";
  const slug = context.params.slug;
  try {
    const data = await fetchWithArgs(SINGLE_ARTICLE_QUERY, {
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
    throw new Error("Internal Server Error");
  }
}

const useStyles = makeStyles((theme) => ({
  chip: {
    marginBottom: "1rem",
  },
  imageWrapper: {
    position: "relative",
    boxShadow: "rgba(0, 0, 0, 0.7) 0px 5px 15px",
    aspectRatio: 16 / 9,
  },
  caption: {
    display: "inline-block",
    position: "absolute",
    bottom: 0,
    left: 0,
    background: theme.palette.black.main,
    fontWeight: 600,
    padding: "5px 10px",
  },
  title: {
    fontWeight: 600,
    margin: "0 0 1rem 0",
  },
  excerpt: {
    fontWeight: 600,

    margin: "1rem 0",
  },
  category: {
    color: theme.palette.primary.main,
    cursor: "pointer",
    textTransform: "uppercase",
    marginRight: "10px",
    borderRadius: "0px",
    borderColor: theme.palette.primary.main,
  },
  tag: {
    cursor: "pointer",
    textTransform: "uppercase",
    marginRight: "10px",
    borderRadius: "0px",
    borderColor: theme.palette.light.main,
  },
  published_at: {
    borderColor: theme.palette.background.default,
    marginRight: "10px",

    borderRadius: "0px",
  },
  writer: {
    borderColor: theme.palette.background.default,
    borderRadius: "0px",
  },
  divider: {
    margin: "1rem 0",
    height: "3px",
    "&:first-of-type": {
      marginTop: "0",
    },
  },
  container: {
    [theme.breakpoints.up("lg")]: {
      alignItems: "flex-start",
    },
  },
  rightColumn: {
    [theme.breakpoints.up("lg")]: {
      position: "sticky",
      top: 0,
      height: "100dvh",
    },
  },
}));
