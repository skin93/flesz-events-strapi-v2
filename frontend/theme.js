import { createTheme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';

const theme = createTheme({
  overrides: {
    MuiCardContent: {
      root: {
        padding: '1rem 1.5rem',
        '&:last-child': {
          paddingBottom: '1rem',
        },
      },
    },
    MuiDialog: {
      paper: {
        margin: 0,
      },
      scrollBody: {
        textAlign: 'right',
      },
      paperScrollBody: {
        textAlign: 'left',
      },
    },
    MuiDialogTitle: {
      root: {
        fontSize: '3rem',
      },
    },
    MuiDialogActions: {
      root: {
        justifyContent: 'center',
      },
    },
    MuiTypography: {
      subtitle2: {
        marginBottom: '12px',
      },
    },
    MuiListItem: {
      button: {
        transition: 'all .2s ease-in-out',
        '&:hover': {
          backgroundColor: 'transparent',
          color: '#32e0c4',
          transform: 'scale(1.1)',
        },
      },
    },
    MuiButton: {
      root: {
        transition: 'all .2s ease-in-out',
        '&:hover': {
          backgroundColor: 'transparent',
          color: '#32e0c4',
          transform: 'scale(1.1)',
        },
      },
    },
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
            width: '100%',
            height: '100%',
            maxWidth: '800px',
            maxHeight: '450px',
            objectFit: 'contain',
          },
        },
        '.leaflet-top': {
          display: 'none',
        },
        '.leaflet-left': {
          display: 'none',
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
        h2: {
          fontSize: 'calc(1.3rem + .8vw)',
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
            color: '#32e0c4',
          },
          backgroundColor: 'transparent',
          padding: '30px',
          lineHeight: '2em',
          margin: '0 auto',
          width: '80%',
          fontSize: 'calc(.7rem + .5vw)',
        },
        p: {
          fontSize: 'calc(.8rem + .5vw)',
          lineHeight: '1.5',
          color: grey[400],
        },
        span: {
          backgroundColor: 'transparent',
        },
        a: {
          color: '#32e0c4',
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
            color: '#32e0c4',
          },
        },
        ul: {
          li: {
            listStyle: 'square',
          },
        },
        '.marker-btn': {
          background: 'none',
          border: 'none',
          cursor: 'pointer',
        },
      },
    },
  },
  palette: {
    primary: {
      main: '#32e0c4',
      darker: '#248f7e',
    },
    type: 'dark',
    accent: {
      main: '#32e0c4',
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
});

export default theme;
