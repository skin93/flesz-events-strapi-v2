import { Fragment, useState, useEffect, useCallback } from "react";
import { NextSeo } from "next-seo";

import Link from "next/link";

import { fetcher } from "@/lib/fetcher";
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

  const [limit] = useState(6);

  const [articlesToShow, setArticlesToShow] = useState(data?.articles);
  const [hasMore, setHasMore] = useState(true);

  const getMoreArticles = useCallback(async () => {
    const res = await fetcher(ALL_ARTICLES_QUERY, {
      start: articlesToShow.length,
      limit,
    });

    setArticlesToShow((articlesToShow) => [...articlesToShow, ...res.articles]);
  }, [articlesToShow]);

  useEffect(() => {
    setHasMore(
      data?.articlesConnection.aggregate.count > articlesToShow.length
        ? true
        : false
    );
  }, [articlesToShow, data?.articlesConnection.aggregate.count]);

  return (
    <Fragment>
      <NextSeo nofollow={true} />
      <Container
        component="section"
        maxWidth="lg"
        className={classes.root}
        style={{ flexGrow: 1, padding: "15px" }}
        aria-label="home-page"
      >
        <Typography variant="h1" className={classes.heading}>
          OSTATNIE WPISY
        </Typography>

        <InfiniteScroll
          style={{ overflowX: "hidden" }}
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
          <Grid
            className={classes.articles}
            container
            justifyContent="space-between"
            spacing={3}
          >
            {articlesToShow.map((article) => (
              <Fade key={article.id} in timeout={500}>
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
    </Fragment>
  );
};

export default Home;

export async function getStaticProps() {
  try {
    const data = await fetcher(ALL_ARTICLES_QUERY, {
      start: 0,
      limit: 6,
    });

    if (!data) {
      return { notFound: true };
    }

    return {
      props: { data },
      revalidate: 10,
    };
  } catch (error) {
    return { notFound: true };
  }
}

const useStyles = makeStyles((theme) => ({
  heading: {
    textAlign: "center",
    color: theme.palette.light.main,
    margin: "3rem auto 0 auto",
    fontWeight: 600,
    textTransform: "uppercase",
  },
  block: {
    display: "flex",
    justifyContent: "center",
    marginBlock: "3rem",
  },
  endMessage: {
    margin: 0,
    color: theme.palette.text.disabled,
  },
  articles: {
    margin: "3rem 0 0 0",
  },
}));
