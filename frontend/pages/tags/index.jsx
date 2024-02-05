import { Fragment, useState, useEffect, useCallback } from "react";

import { fetcher } from "@/lib/fetcher";
import { ALL_TAGS_QUERY } from "@/lib/queries/tags/allTagsQuery";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";

import TagsContainer from "@/components/tags/TagsContainer";
import LoadMoreButton from "@/components/UI/LoadMoreButton";
import { NextSeo } from "next-seo";
import { Fade } from "@material-ui/core";

const TagsPage = ({ data }) => {
  const classes = useStyles();

  const [tagsPerPage] = useState(24);
  const [tagsToShow, setTagsToShow] = useState([]);
  const [next, setNext] = useState(tagsPerPage);
  const [tagsFound, setTagsFound] = useState([]);
  const [search, setSearch] = useState("");

  const loopWithSlice = useCallback((start, end) => {
    const slicedTags = data.tags.slice(start, end);
    setTagsToShow((prev) => [...prev, ...slicedTags]);
  }, []);

  useEffect(() => {
    loopWithSlice(0, tagsPerPage);
  }, [loopWithSlice, tagsPerPage]);

  const handleShowMoreTags = useCallback(() => {
    loopWithSlice(next, next + tagsPerPage);
    setNext(next + tagsPerPage);
  }, [loopWithSlice, next, tagsPerPage]);

  const handleChange = (e) => {
    setSearch(e.target.value);

    const tagsFound = data.tags.filter(({ name }) =>
      name.toLowerCase().includes(e.target.value.toLowerCase())
    );

    setTagsFound(tagsFound);
  };

  return (
    <main>
      <NextSeo
        title="Tagi"
        description="Zbiór wszystkich tagów"
        nofollow={false}
        canonical={`${process.env.NEXT_PUBLIC_APP_DOMAIN}/tags`}
        openGraph={{
          title: `Tagi | ${process.env.NEXT_PUBLIC_APP_NAME}`,
          descirption: "Zbiór wszystkich tagów",
          url: `${process.env.NEXT_PUBLIC_APP_DOMAIN}/tags`,
        }}
      />
      <Fade in timeout={200}>
        <Container component="section" maxWidth="lg" aria-label="tags-page">
          <Typography variant="h1" component="h1" className={classes.heading}>
            TAGI
          </Typography>
          <form className={classes.form} noValidate autoComplete="off">
            <TextField
              value={search}
              onChange={handleChange}
              className={classes.textField}
              id="outlined-basic"
              label="Szukaj tagu"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </form>
          {search && tagsFound.length > 0 ? (
            <TagsContainer aria-label="tags-filtered" tags={tagsFound} />
          ) : search && tagsFound.length === 0 ? null : (
            <TagsContainer aria-label="all-tags" tags={tagsToShow} />
          )}
          <LoadMoreButton
            onChange={handleChange}
            next={next}
            count={data.tagsConnection.aggregate.count}
            onClick={handleShowMoreTags}
          />
        </Container>
      </Fade>
    </main>
  );
};

export default TagsPage;

export async function getServerSideProps() {
  try {
    const data = await fetcher(ALL_TAGS_QUERY);

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
    paddingInline: "1rem",
  },
  heading: {
    textAlign: "center",
    margin: "3rem 0",
    fontWeight: 600,
    textTransform: "uppercase",
  },
  form: {
    display: "block",
    textAlign: "center",
    margin: "30px auto",
  },
  textField: {
    width: "50%",
  },
  loadMoreButton: {
    display: "block",
    margin: "30px auto",
    textAlign: "center",
    color: theme.palette.primary.main,
  },
}));
