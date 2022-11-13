import { Fragment, useState, useEffect, useCallback } from "react";
import { NextSeo } from "next-seo";

import Link from "next/link";

import { fetchWithArgs } from "@/lib/fetcher";
import { SEARCH_ARTICLES_QUERY } from "@/lib/queries/articles/searchArticlesQuery";

import InfiniteScroll from "react-infinite-scroll-component";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Fade from "@material-ui/core/Fade";

import BaseCard from "@/components/UI/BaseCard";
import Container from "@material-ui/core/Container";

const SearchPage = ({ data, q }) => {
  const classes = useStyles();

  const [articlesToShow, setArticlesToShow] = useState(data?.articles);
  const [hasMore, setHasMore] = useState(true);

  const getMoreArticles = useCallback(async () => {
    const res = await fetchWithArgs(SEARCH_ARTICLES_QUERY, {
      start: articlesToShow.length,
      limit: 6,
      q,
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
            WYNIKI WYSZUKIWAŃ DLA FRAZY "{q}"
          </Typography>

          <InfiniteScroll
            scrollThreshold="50%"
            style={{ overflow: "hidden" }}
            dataLength={articlesToShow.length}
            next={getMoreArticles}
            hasMore={hasMore}
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
                    <Link
                      scroll={false}
                      href={`/articles/${article.slug}`}
                      passHref
                    >
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

export default SearchPage;

export async function getServerSideProps(context) {
  const q = context.query.q;
  try {
    const data = await fetchWithArgs(SEARCH_ARTICLES_QUERY, {
      start: 0,
      limit: 6,
      q,
    });

    if (!data) {
      return { notFound: true };
    }

    return {
      props: { data, q },
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
