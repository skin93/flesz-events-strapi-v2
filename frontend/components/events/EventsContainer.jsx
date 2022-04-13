import Link from "next/link";

import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Fade from "@material-ui/core/Fade";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

import Moment from "react-moment";
import moment from "moment";
import "moment/locale/pl";

const EventsContainer = ({ events }) => {
  moment.locale("pl");
  const classes = useStyles();

  return (
    <Grid container direction="column" className={classes.container}>
      {events.map((event) => (
        <Fade key={event.id} in timeout={200}>
          <Grid item xs={12}>
            <Link href={`/articles/${event.article.slug}`} passHref>
              <a>
                <div className={classes.eventItem}>
                  <div className={classes.eventInfo}>
                    {event.end_date &&
                    event.end_date.split("-")[1] !==
                      event.date.split("-")[1] ? (
                      <Typography className={classes.eventName} component="h3">
                        <Moment format="DD.MM">{event.date}</Moment>-
                        <Moment format="DD.MM.YY">{event.end_date}</Moment>{" "}
                        <span className={classes.divider}>/</span> {event.name}
                      </Typography>
                    ) : event.end_date &&
                      event.end_date.split("-")[1] ===
                        event.date.split("-")[1] ? (
                      <Typography className={classes.eventName} component="h3">
                        <Moment format="DD">{event.date}</Moment>-
                        <Moment format="DD.MM.YY">{event.end_date}</Moment>{" "}
                        <span className={classes.divider}>/</span> {event.name}
                      </Typography>
                    ) : (
                      <Typography className={classes.eventName} component="h3">
                        <Moment format="DD.MM.YY">{event.date}</Moment>{" "}
                        <span className={classes.divider}>/</span> {event.name}
                      </Typography>
                    )}
                    <Typography
                      className={classes.eventLocalization}
                      component="span"
                    >
                      {event.city} / {event.place}
                    </Typography>
                  </div>
                </div>
              </a>
            </Link>
            <Divider className={classes.divider} />
          </Grid>
        </Fade>
      ))}
    </Grid>
  );
};

export default EventsContainer;

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: "30px",
  },
  eventItem: {
    width: "100%",
    padding: "3rem",
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    color: theme.palette.light.main,
    backgroundColor: "inherit",
    marginBlock: "2rem",
    transform: "translateX(0)",
    transition: "all .2s ease-in-out",
    "&:hover": {
      transform: "translateX(10px)",
      backgroundColor: theme.palette.grey[800],
    },
  },
  eventInfo: {
    flex: 1,
  },
  eventName: {
    fontSize: "calc(1rem + 0.8vw)",
    textTransform: "uppercase",
  },
  eventLocalization: {
    fontSize: "1rem",
    color: theme.palette.grey[500],
  },
  divider: {
    color: theme.palette.primary.main,
  },
}));
