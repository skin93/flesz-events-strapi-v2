import { Fade } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Link from "next/link";

const ResultsContainer = ({ articles, onClick }) => {
  const classes = useStyles();
  return (
    <Fade in timeout={500}>
      <Container
        maxWidth="lg"
        aria-label="Results container"
        className={classes.container}
      >
        <ul className={classes.results}>
          {articles.map((article) => (
            <li key={article.id} className={classes.resultItem}>
              <Link href={`/articles/${article.slug}`} passHref>
                <a onClick={onClick}>{article.title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Fade>
  );
};

export default ResultsContainer;

const useStyles = makeStyles((theme) => ({
  container: {
    margin: "3rem auto 0 auto",
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.palette.background.default,
    "& > h2": {
      color: theme.palette.primary.main,
      marginLeft: "auto",
    },
    "&  a": {
      color: theme.palette.light.main,
    },
  },
  results: {
    padding: "1rem 2rem",
    textAlign: "right",
  },
  resultItem: {
    listStyle: "none",
    lineHeight: 2,
    transform: "scale(1)",
    transition: ".2s all ease-in-out",
    "&:hover": {
      transform: "scale(1.03)",
    },
    "& a": {
      "&:hover": {
        color: theme.palette.accent.main,
      },
    },
  },
}));
