import { Fragment, useState, useEffect, useCallback } from "react";

import Link from "next/link";

import { fetchWithArgs } from "@/lib/fetcher";
import { SINGLE_TAG_QUERY } from "@/lib/queries/tags/singleTagQuery";

import InfiniteScroll from "react-infinite-scroll-component";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Fade from "@material-ui/core/Fade";

import BaseCard from "@/components/UI/BaseCard";
import { NextSeo } from "next-seo";
import { getMediaUrl } from "@/lib/getMediaUrl";

const TagPage = ({ data }) => {
  const classes = useStyles();

  const [limit] = useState(12);

  const [articlesToShow, setArticlesToShow] = useState(data?.tags[0].articles);
  const [hasMore, setHasMore] = useState(true);

  const getMoreArticles = useCallback(async () => {
    const res = await fetchWithArgs(SINGLE_TAG_QUERY, {
      start: articlesToShow.length,
      limit,
      slug: data?.tags[0].slug,
    });

    setArticlesToShow((articlesToShow) => [
      ...articlesToShow,
      ...res?.tags[0].articles,
    ]);
  }, [articlesToShow]);

  useEffect(() => {
    setHasMore(
      data?.articlesCountBasedOnTagOrCategory > articlesToShow.length
        ? true
        : false
    );
  }, [articlesToShow, data?.articlesCountBasedOnTagOrCategory]);

  const tag = data?.tags[0];

  return (
    <Fragment>
      <NextSeo
        title={tag.metadata.meta_title}
        description={tag.metadata.meta_description}
        nofollow={!tag.metadata.follow}
        noindex={!tag.metadata.index}
        canonical={`${process.env.NEXT_PUBLIC_APP_DOMAIN}/tags/${tag.slug}`}
        openGraph={{
          title: `${tag.metadata.og_title} | ${process.env.NEXT_PUBLIC_APP_NAME}`,
          descirption: tag.metadata.og_description,
          type: tag.metadata.og_type,
          url: `${process.env.NEXT_PUBLIC_APP_DOMAIN}/tags/${tag.slug}`,
          images: tag.metadata.share_image
            ? [
                {
                  url: getMediaUrl(tag.metadata.share_image.media),
                  width: tag.metadata.share_image.media.width,
                  height: tag.metadata.share_image.media.height,
                  alt: tag.metadata.share_image.media.alternativeText,
                },
              ]
            : [
                {
                  url: `${process.env.NEXT_PUBLIC_APP_DOMAIN}/logo-publikacja.png`,
                  width: 1200,
                  height: 628,
                  alt: "Flesz.Events logo",
                },
              ],
        }}
      />

      <Container
        component="section"
        maxWidth="lg"
        aria-label="tag-page"
        className={classes.container}
      >
        {articlesToShow.length > 0 ? (
          <Fragment>
            <Typography variant="h1" className={classes.heading}>
              <span>#</span>
              {tag.name}
            </Typography>
            <InfiniteScroll
              style={{ overflow: "hidden" }}
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
              }
            >
              <Grid className={classes.articles} container spacing={4}>
                {articlesToShow.map((article) => (
                  <Fade key={article.id} in timeout={200}>
                    <Grid item xs={12} md={6}>
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
          </Fragment>
        ) : (
          <div className={classes.noArticles}>
            <Typography variant="h1" className={classes.noHeading}>
              BRAK WPISÓW...
            </Typography>
          </div>
        )}
      </Container>
    </Fragment>
  );
};

export default TagPage;

export async function getServerSideProps({ params }) {
  try {
    const data = await fetchWithArgs(SINGLE_TAG_QUERY, {
      slug: params.slug,
      start: 0,
      limit: 12,
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
  heading: {
    textAlign: "center",
    margin: "3rem 0",
    fontWeight: 600,
    textTransform: "uppercase",
    " & > span": {
      color: theme.palette.primary.main,
    },
  },
  noHeading: {
    fontWeight: 600,
    textTransform: "uppercase",
  },
  container: {
    paddingInline: 0,
    position: "relative",
    height: "100vh",
  },
  noArticles: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
  },
  loadMoreButton: {
    display: "block",
    margin: "30px auto",
    fontWeight: "bold",
    color: theme.palette.primary.main,
  },
  block: {
    display: "flex",
    justifyContent: "center",
    marginTop: "3rem",
  },
  endMessage: {
    margin: 0,
    color: theme.palette.text.disabled,
  },
  articles: {
    margin: 0,
    maxWidth: "100%",
  },
}));
