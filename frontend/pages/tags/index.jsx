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

const TagsPage = ({ data }) => {
  const classes = useStyles();

  const [tagsPerPage] = useState(12);
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
    if (e.target.value === "") {
      clear();
      return;
    }

    setSearch(e.target.value);

    const tagsFound = data.tags.filter((tag) =>
      tag.name.toLowerCase().includes(e.target.value.toLowerCase())
    );

    setTagsFound(tagsFound);
    console.log(search.split("").length);
  };

  const clear = () => {
    setTagsFound([]);
    setSearch("");
  };

  return (
    <Fragment>
      <NextSeo
        title="Tagi"
        description="Zbiór wszystkich tagów"
        nofollow={true}
        cannonical={`${process.env.NEXT_PUBLIC_APP_DOMAIN}/tags`}
        openGraph={{
          title: "Tagi | Flesz.Events",
          descirption: "Zbiór wszystkich tagów",
          url: `${process.env.NEXT_PUBLIC_APP_DOMAIN}/tags`,
        }}
      />
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
        {search !== "" && tagsFound.length > 0 ? (
          <TagsContainer aria-label="tags-filtered" tags={tagsFound} />
        ) : search !== "" && tagsFound.length === 0 ? null : (
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
    return { notFound: true };
  }
}

const useStyles = makeStyles((theme) => ({
  heading: {
    textAlign: "center",
    color: theme.palette.light.main,
    margin: "2rem 0 3rem 0",
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
