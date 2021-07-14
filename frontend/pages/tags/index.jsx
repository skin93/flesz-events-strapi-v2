import React, { useState, useEffect, useCallback } from 'react';

import dynamic from 'next/dynamic';

import useSWR from 'swr';
import { client } from '@/lib/requestClient';
import { ALL_TAGS_QUERY } from '@/lib/queries/tags/allTagsQuery';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';

import SEO from '@/components/SEO';
import TagsContainer from '@/components/tags/TagsContainer';
import LoadMoreButton from '@/components/UI/LoadMoreButton';
const SkeletonCard = dynamic(() => import('@/components/UI/SkeletonCard'));

const TagsPage = (props) => {
  const classes = useStyles();

  const [tagsPerPage] = useState(24);
  const [tagsToShow, setTagsToShow] = useState([]);
  const [next, setNext] = useState(tagsPerPage);
  const [tagsFound, setTagsFound] = useState([]);

  const fetcher = async (query) => await client.request(query);

  const q = ALL_TAGS_QUERY;

  const { error, data } = useSWR(q, fetcher, {
    initialData: props.data,
  });

  const loopWithSlice = useCallback(
    (start, end) => {
      const slicedTags = data.tags.slice(start, end);
      setTagsToShow((prevTags) => [...prevTags, ...slicedTags]);
    },
    [data]
  );

  useEffect(() => {
    loopWithSlice(0, tagsPerPage);
  }, [loopWithSlice, tagsPerPage]);

  const handleShowMoreTags = useCallback(() => {
    loopWithSlice(next, next + tagsPerPage);
    setNext(next + tagsPerPage);
  }, [loopWithSlice, next, tagsPerPage]);

  const handleChange = useCallback(
    (e) => {
      const tagsFound = data.tags.filter(
        (tag) =>
          e.target.value !== '' &&
          tag.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setTagsFound(tagsFound);
    },
    [data]
  );

  if (error) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <p>Coś poszło nie tak...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <Grid container spacing={2} className={classes.container}>
        {[0, 1, 2, 3, 4, 5].map((x) => (
          <Grid item key={x} xs={6} sm={4}>
            <SkeletonCard />
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <React.Fragment>
      <SEO meta_title='Tagi' meta_description='Zbiór wszystkich tagów.' />
      <Fade in timeout={200}>
        <section className={classes.root} aria-label='tags-page'>
          <Typography variant='h6' className={classes.heading}>
            TAGI
          </Typography>
          <form className={classes.form} noValidate autoComplete='off'>
            <TextField
              onChange={handleChange}
              className={classes.textField}
              id='outlined-basic'
              label='Szukaj tagu'
              variant='outlined'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </form>
          {tagsFound.length > 0 ? (
            <TagsContainer aria-label='tags-filtered' tags={tagsFound} />
          ) : (
            <TagsContainer aria-label='all-tags' tags={tagsToShow} />
          )}
          <LoadMoreButton
            onChange={handleChange}
            next={next}
            count={data.tagsConnection.aggregate.count}
            onClick={handleShowMoreTags}
          />
        </section>
      </Fade>
    </React.Fragment>
  );
};

export default TagsPage;

export async function getServerSideProps() {
  const data = await client.request(ALL_TAGS_QUERY);

  return {
    props: { data },
  };
}

const useStyles = makeStyles((theme) => ({
  root: { padding: '15px' },
  heading: {
    textAlign: 'center',
    color: theme.palette.light.main,
  },
  form: {
    display: 'block',
    textAlign: 'center',
    margin: '30px auto',
  },
  textField: {
    width: '50%',
  },
  loadMoreButton: {
    display: 'block',
    margin: '30px auto',
    textAlign: 'center',
    color: theme.palette.accent.main,
  },
}));
