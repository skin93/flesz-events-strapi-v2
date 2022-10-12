import { Fragment, useState, useEffect, useCallback } from "react";

import Link from "next/link";
import { fetchWithArgs } from "@/lib/fetcher";
import { SINGLE_CATEGORY_QUERY } from "@/lib/queries/categories/singleCategoryQuery";

import InfiniteScroll from "react-infinite-scroll-component";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Fade from "@material-ui/core/Fade";

import BaseCard from "@/components/UI/BaseCard";
import { NextSeo } from "next-seo";

const CategoryPage = ({ data }) => {
  const classes = useStyles();

  const [articlesToShow, setArticlesToShow] = useState(
    data?.categories[0].articles
  );
  const [hasMore, setHasMore] = useState(true);

  const getMoreArticles = useCallback(async () => {
    const res = await fetchWithArgs(SINGLE_CATEGORY_QUERY, {
      start: articlesToShow.length,
      limit: 6,
      slug: data?.categories[0].slug,
    });

    setArticlesToShow((articlesToShow) => [
      ...articlesToShow,
      ...res?.categories[0].articles,
    ]);
  }, [articlesToShow]);

  useEffect(() => {
    setHasMore(
      data?.articlesCountBasedOnTagOrCategory > articlesToShow.length
        ? true
        : false
    );
  }, [articlesToShow]);

  const category = data?.categories[0];

  return (
    <Fragment>
      <NextSeo
        title={category.metadata.meta_title}
        description={category.metadata.meta_description}
        nofollow={!category.metadata.follow}
        noindex={!category.metadata.index}
        canonical={`${process.env.NEXT_PUBLIC_APP_DOMAIN}/categories/${category.slug}`}
        openGraph={{
          title: `${category.metadata.og_title} | ${process.env.NEXT_PUBLIC_APP_NAME}`,
          descirption: category.metadata.og_description,
          type: category.metadata.og_type,
          url: `${process.env.NEXT_PUBLIC_APP_DOMAIN}/categories/${category.slug}`,
        }}
      />
      <Fade in timeout={200}>
        <Container component="section" maxWidth="lg" aria-label="category-page">
          {articlesToShow.length > 0 ? (
            <Fragment>
              <Typography variant="h1" className={classes.heading}>
                {category.name}
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
            <div>
              <Typography variant="h1" className={classes.heading}>
                BRAK WPISÓW...
              </Typography>
            </div>
          )}
        </Container>
      </Fade>
    </Fragment>
  );
};

export default CategoryPage;

export async function getServerSideProps({ params }) {
  try {
    const data = await fetchWithArgs(SINGLE_CATEGORY_QUERY, {
      slug: params.slug,
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
    return { notFound: true };
  }
}

const useStyles = makeStyles((theme) => ({
  container: {
    paddingInline: 0,
  },
  heading: {
    margin: "3rem 0",
    textAlign: "center",
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
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
