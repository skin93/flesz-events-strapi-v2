import { createMuiTheme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import teal from '@material-ui/core/colors/teal';

const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        figure: {
          display: 'flex',
          justifyContent: 'center',
          textAlign: 'left',
          fontSize: 'calc(.7rem + .5vw)',
          lineHeight: '1.5',
          margin: '30px',
          '& img': {
            width: '60%',
            height: 'auto',
          },
        },
        '.raw-html-embed': {
          position: 'relative',
          overflow: 'hidden',
          width: '100%',
          paddingTop: '56.25%',

          '& iframe': {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            width: '80%',
            height: '80%',
          },
        },
        body: {
          padding: 0,
          margin: 0,
          backgroundColor: grey[900],
        },
        blockquote: {
          '& > p': {
            color: grey[50],
          },
          fontWeight: 600,
          fontStyle: 'italic',
          quotes: '"“" "”"',
          position: 'relative',
          '&::before': {
            content: 'open-quote',
            position: 'absolute',
            top: 60,
            left: -40,
            fontSize: '6em',
            color: teal.A400,
          },
          backgroundColor: 'transparent',
          padding: '30px',
          lineHeight: '2em',
          margin: '0 auto',
          width: '80%',
          fontSize: 'calc(.7rem + .5vw)',
        },
        h2: {
          color: '#eee',
          fontWeight: 'bold',
          fontSize: 'calc(1rem + 1vw)',
        },
        p: {
          fontSize: 'calc(.7rem + .5vw)',
          lineHeight: '1.5',
          color: grey[400],
        },
        span: {
          backgroundColor: 'transparent',
        },
        a: {
          color: teal.A400,
          textDecoration: 'none',
        },
        strong: {
          color: '#eee',
        },
        ul: {
          paddingLeft: '0px',
          margin: '0 auto',
        },
        ol: {
          paddingLeft: '0xp',
          margin: '0 auto',
        },
        li: {
          lineHeight: '1.5',
          fontSize: 'calc(.7rem + .5vw)',
          '&::marker': {
            color: teal.A400,
          },
        },
        ul: {
          li: {
            listStyle: 'square',
          },
        },
      },
    },
  },
  palette: {
    primary: {
      main: teal.A400,
    },
    type: 'dark',
    accent: {
      main: teal.A400,
    },
    light: {
      main: grey[200],
    },
    black: {
      main: '#212121',
    },
    muted: {
      main: 'rgb(179, 179, 179)',
      darker: 'rgba(179, 179, 179, 0.1)',
    },
    background: {
      main: 'rgb(36,36,36)',
      lighter: 'rgb(40,40,40)',
    },
  },
  typography: {
    h1: {
      fontSize: '3rem',
    },
    subtitle1: {
      fontSize: '1.2rem',
      fontWeight: 'bold',
    },
  },
});

export default theme;