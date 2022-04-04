import { Fragment } from "react";
import moment from "moment";

import { fetchWithArgs } from "@/lib/fetcher";
import { ALL_EVENTS_BY_DATE_QUERY } from "@/lib/queries/events/allEventsByDateQuery";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import EventsContainer from "@/components/events/EventsContainer";
import { NextSeo } from "next-seo";

const EventsPage = ({ data }) => {
  const classes = useStyles();

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
        <EventsContainer aria-label="all-events" events={data.events} />
      </Container>
    </Fragment>
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
