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
        <Fade key={event.name} in timeout={200}>
          <Grid item xs={12}>
            <Link href={`/articles/${event.article.slug}`} passHref>
              <a>
                <div className={classes.eventItem}>
                  <div className={classes.eventInfo}>
                    <Typography className={classes.eventName} component="h3">
                      {event.name}
                    </Typography>
                    <Typography
                      className={classes.eventLocalization}
                      component="span"
                    >
                      {event.city} / {event.place}
                    </Typography>
                  </div>
                  <Moment className={classes.eventDate} format="DD.MM.YY">
                    {event.date}
                  </Moment>
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
    flex: 3,
  },
  eventName: {
    fontSize: "calc(1rem + 0.8vw)",
  },
  eventLocalization: {
    fontSize: "1rem",
    color: theme.palette.grey[500],
  },
  eventDate: {
    fontSize: "calc(1rem + 0.8vw)",
    flex: 2,
    textAlign: "right",
  },
}));
