import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';

const ResultsContainer = ({ articles, onClick }) => {
  const classes = useStyles();
  return (
    <Container
      maxWidth='lg'
      aria-label='Results container'
      className={classes.results}>
      <ul>
        {articles.map((article) => (
          <li key={article.id} className={classes.resultItem}>
            <Link href={`/articles/${article.slug}`} passHref>
              <a onClick={onClick}>{article.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default ResultsContainer;

const useStyles = makeStyles((theme) => ({
  results: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.default,
    '& > h2': {
      color: theme.palette.primary.main,
      marginLeft: 'auto',
    },
    '&  a': {
      color: theme.palette.light.main,
    },
  },
  resultItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    lineHeight: 2,
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,0.2)',
    },
  },
}));
