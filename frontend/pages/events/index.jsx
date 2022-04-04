import { Fragment, useState, useEffect, useCallback } from "react";
import moment from "moment";

import { fetchWithArgs } from "@/lib/fetcher";
import { ALL_EVENTS_BY_DATE_QUERY } from "@/lib/queries/events/allEventsByDateQuery";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";

import EventsContainer from "@/components/events/EventsContainer";
import LoadMoreButton from "@/components/UI/LoadMoreButton";
import { NextSeo } from "next-seo";

const EventsPage = ({ data }) => {
  const classes = useStyles();

  const [eventsPerPage] = useState(12);
  const [eventsToShow, setEventsToShow] = useState([]);
  const [next, setNext] = useState(eventsPerPage);
  const [eventsFound, setEventsFound] = useState([]);
  const [search, setSearch] = useState("");

  const loopWithSlice = useCallback((start, end) => {
    const slicedEvents = data.events.slice(start, end);
    setEventsToShow((prev) => [...prev, ...slicedEvents]);
  }, []);

  useEffect(() => {
    loopWithSlice(0, eventsPerPage);
  }, [loopWithSlice, eventsPerPage]);

  const handleShowMoreEvents = useCallback(() => {
    loopWithSlice(next, next + eventsPerPage);
    setNext(next + eventsPerPage);
  }, [loopWithSlice, next, eventsPerPage]);

  const handleChange = (e) => {
    if (e.target.value === "") {
      clear();
      return;
    }

    setSearch(e.target.value);

    const eventsFound = data.events.filter((event) =>
      event.name.toLowerCase().includes(e.target.value.toLowerCase())
    );

    setEventsFound(eventsFound);
  };

  const clear = () => {
    setEventsFound([]);
    setSearch("");
  };

  return (
    <Fragment>
      <NextSeo
        title="Eventy"
        description="Lista nadchodzących wydarzeń"
        nofollow={true}
        canonical={`${process.env.NEXT_PUBLIC_APP_DOMAIN}/events`}
        openGraph={{
          title: `Eventy | ${process.env.NEXT_PUBLIC_APP_NAME}`,
          descirption: "Lista nadchodzących wydarzeń",
          url: `${process.env.NEXT_PUBLIC_APP_DOMAIN}/events`,
        }}
      />
      <Container
        component="section"
        maxWidth="lg"
        className={classes.container}
        aria-label="events-container"
      >
        <Typography component="h1" className={classes.heading}>
          NAJBLIŻSZE EVENTY
        </Typography>
        <form className={classes.form} noValidate autoComplete="off">
          <TextField
            value={search}
            onChange={handleChange}
            className={classes.textField}
            id="outlined-basic"
            label="Podaj nazwę eventu / miasto / miejsce"
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
        {search !== "" && eventsFound.length > 0 ? (
          <EventsContainer aria-label="events-filtered" events={eventsFound} />
        ) : search !== "" && eventsFound.length === 0 ? null : (
          <EventsContainer aria-label="all-events" events={eventsToShow} />
        )}
        <LoadMoreButton
          onChange={handleChange}
          next={next}
          count={data.eventsConnection.aggregate.count}
          onClick={handleShowMoreEvents}
        />
      </Container>
    </Fragment>
  );
};

export default EventsPage;

export async function getServerSideProps() {
  let date = moment(new Date()).format("YYYY-MM-DD");
  console.log(date);

  try {
    const data = await fetchWithArgs(ALL_EVENTS_BY_DATE_QUERY, {
      date,
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
    paddingInline: "1rem",
  },
  heading: {
    textAlign: "center",
    margin: "2rem 0 3rem 0",
    fontWeight: 600,
    fontSize: "calc(2rem + .8vw)",
    textTransform: "uppercase",
  },
  form: {
    display: "flex",
    gap: "30px",
    alignItems: "center",
    flexDirection: "column",
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
