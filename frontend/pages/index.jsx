import { Fragment, useState, useEffect, useCallback } from "react";
import { NextSeo } from "next-seo";

import Link from "next/link";

import { fetchWithArgs } from "@/lib/fetcher";
import { ALL_ARTICLES_QUERY } from "@/lib/queries/articles/allArticlesQuery";

import InfiniteScroll from "react-infinite-scroll-component";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Fade from "@material-ui/core/Fade";

import BaseCard from "@/components/UI/BaseCard";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";

const Home = ({ data }) => {
  const classes = useStyles();

  const [articlesToShow, setArticlesToShow] = useState(data?.articles);
  const [hasMore, setHasMore] = useState(true);

  const getMoreArticles = useCallback(async () => {
    const res = await fetchWithArgs(ALL_ARTICLES_QUERY, {
      start: articlesToShow.length,
      limit: 6,
    });

    setArticlesToShow((articlesToShow) => [...articlesToShow, ...res.articles]);
  }, [articlesToShow]);

  useEffect(() => {
    setHasMore(
      data?.articlesConnection.aggregate.count > articlesToShow.length
        ? true
        : false
    );
  }, [articlesToShow]);

  return (
    <Fragment>
      <NextSeo nofollow={true} />
      <Fade in timeout={200}>
        <Container component="section" maxWidth="lg" aria-label="home-page">
          <Typography variant="h1" className={classes.heading}>
            OSTATNIE WPISY
          </Typography>

          <InfiniteScroll
            scrollThreshold="50%"
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
        </Container>
      </Fade>
    </Fragment>
  );
};

export default Home;

export async function getServerSideProps() {
  try {
    const data = await fetchWithArgs(ALL_ARTICLES_QUERY, {
      start: 0,
      limit: 6,
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
  container: {
    paddingInline: 0,
  },
  heading: {
    textAlign: "center",
    margin: "3rem 0",
    fontWeight: 600,
    textTransform: "uppercase",
  },
  block: {
    display: "flex",
    justifyContent: "center",
    margin: "3rem 0",
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
