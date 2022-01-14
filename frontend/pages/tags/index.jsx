import { Fragment, useState, useEffect, useCallback } from "react";

import { tagsFetcher } from "@/lib/fetcher";
import { ALL_TAGS_QUERY } from "@/lib/queries/tags/allTagsQuery";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";

import SEO from "@/components/SEO";
import TagsContainer from "@/components/tags/TagsContainer";
import LoadMoreButton from "@/components/UI/LoadMoreButton";

const TagsPage = ({ data }) => {
  const classes = useStyles();

  const [tagsPerPage] = useState(12);
  const [tagsToShow, setTagsToShow] = useState([]);
  const [next, setNext] = useState(tagsPerPage);
  const [tagsFound, setTagsFound] = useState([]);

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

  const handleChange = useCallback((e) => {
    const tagsFound = data.tags.filter(
      (tag) =>
        e.target.value !== "" &&
        tag.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setTagsFound(tagsFound);
  }, []);

  return (
    <Fragment>
      <SEO meta_title="Tagi" meta_description="Zbiór wszystkich tagów." />
      <Container
        component="section"
        maxWidth="lg"
        className={classes.root}
        aria-label="tags-page"
      >
        <Typography component="h1" className={classes.heading}>
          TAGI
        </Typography>
        <form className={classes.form} noValidate autoComplete="off">
          <TextField
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
        {tagsFound.length > 0 ? (
          <TagsContainer aria-label="tags-filtered" tags={tagsFound} />
        ) : (
          <TagsContainer aria-label="all-tags" tags={tagsToShow} />
        )}
        <LoadMoreButton
          onChange={handleChange}
          next={next}
          count={data.tagsConnection.aggregate.count}
          onClick={handleShowMoreTags}
        />
      </Container>
    </Fragment>
  );
};

export default TagsPage;

export async function getStaticProps() {
  try {
    const data = await tagsFetcher(ALL_TAGS_QUERY);

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
    margin: "3rem 0",
    fontWeight: 600,
    fontSize: "calc(2rem + .8vw)",
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
    color: theme.palette.accent.main,
  },
}));
