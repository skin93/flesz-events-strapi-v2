import { Fragment, useState, useMemo } from "react";
import moment from "moment";

import { fetchWithArgs } from "@/lib/fetcher";
import { ALL_EVENTS_BY_DATE_QUERY } from "@/lib/queries/events/allEventsByDateQuery";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import Fade from "@material-ui/core/Fade";

import EventsContainer from "@/components/events/EventsContainer";
import { NextSeo } from "next-seo";

const EventsPage = ({ data }) => {
  const classes = useStyles();
  const [search, setSearch] = useState("");

  const filteredEvents = useMemo(
    () =>
      data?.events.filter(
        (event) =>
          event.name.toLowerCase().includes(search.toLowerCase()) ||
          event.city.toLowerCase().includes(search.toLowerCase()) ||
          event.place.toLowerCase().includes(search.toLowerCase())
      ),
    [search]
  );

  return (
    <main>
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
      <Fade in timeout={200}>
        <Container
          component="section"
          maxWidth="lg"
          aria-label="events-container"
        >
          <Typography variant="h1" component="h1" className={classes.heading}>
            NAJBLIŻSZE EVENTY
          </Typography>
          <form className={classes.form} noValidate autoComplete="off">
            <TextField
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={classes.textField}
              id="outlined-basic"
              label="Podaj nazwę zespołu / festiwalu / miasta / klubu"
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
          <EventsContainer
            aria-label="filtered-events"
            events={filteredEvents}
          />
        </Container>
      </Fade>
    </main>
  );
};

export default EventsPage;

export async function getServerSideProps() {
  let date = moment(new Date()).format("YYYY-MM-DD");

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
