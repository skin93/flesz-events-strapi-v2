import { Fragment } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { NextSeo } from "next-seo";

const ContactPage = () => {
  const classes = useStyles();

  return (
    <Fragment>
      <NextSeo
        title="Kontakt"
        description="W jaki sposób możes nawiązać z nami kontakt?"
        nofollow={true}
        canonical={`${process.env.NEXT_PUBLIC_APP_DOMAIN}/contact`}
        openGraph={{
          title: `Kontakt | ${process.env.NEXT_PUBLIC_APP_NAME}`,
          descirption: "W jaki sposób możes nawiązać z nami kontakt?",
          url: `${process.env.NEXT_PUBLIC_APP_DOMAIN}/contact`,
        }}
      />
      <Container
        component="section"
        maxWidth="lg"
        className={classes.container}
        aria-label="contact-container"
      >
        <Typography variant="h1" component="h1" className={classes.heading}>
          KONTAKT
        </Typography>
        <p className={classes.paragraph}>
          Jeżeli w Twojej okolicy odbywa się ciekawy festiwal, chcesz pochwalić
          się fajnym zespołem albo po prostu potrzebujesz nawiązać z nami
          kontakt, wyślij wiadomość na <span>kontakt@fleszevents.pl</span>
        </p>
      </Container>
    </Fragment>
  );
};

export default ContactPage;

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
  paragraph: {
    "& > span": {
      color: theme.palette.light.main,
      fontWeight: "bold",
    },
  },
}));
