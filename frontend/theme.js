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
      paperWidthSm: {
        maxWidth: '800px',
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
      h1: {
        fontSize: 'clamp(2rem, 3vw, 4rem)',
      },
      h4: {
        fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
      },
      subtitle1: {
        fontSize: 'clamp(1rem, 2vw, 1.2rem)',
      },
      subtitle2: {
        fontSize: 'clamp(.6rem, 3vw, .8rem)',
      },
      caption: {
        fontSize: 'clamp(.6rem, 2vw, .8rem)',
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
          display: 'block',
          textAlign: 'center',
          margin: '30px 0',
          '& > img': {
            width: '100%',
            height: '100%',
            maxHeight: '600px',
            objectFit: 'contain',
          },
          '& > figcaption': {
            fontWeight: 700,
            fontSize: '.75rem',
            fontSize: 'clamp(.6rem, 2vw, .8rem)',
          },
        },
        '.raw-html-embed': {
          display: 'flex',
          justifyContent: 'center',

          '& > iframe': {
            background: 'white',
            maxWidth: '540px',
            width: 'calc(100% - 2px)',
            borderRadius: '3px',
            boxShadow: 'none',
            display: 'block',
            margin: '0 auto',
            minWidth: '326px',
            padding: '0px',
            margin: '30px 0',
          },

          '& > iframe.youtube': {
            maxWidth: '560px',
            maxHeight: '315px',
          },
        },
        body: {
          lineHeight: '1.5',
        },
        h1: {
          fontSize: 'clamp(2rem, 3vw, 3rem)',
        },
        h2: {
          fontSize: 'clamp(1.7rem, 3vw, 2.5rem)',
        },
        h3: {
          fontSize: 'clamp(1.4rem, 3vw, 2rem)',
        },
        h4: {
          fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
        },
        p: {
          fontSize: 'clamp(1rem, 2vw, 1.2rem)',
          color: grey[400],
        },
        ul: {
          fontSize: 'clamp(1rem, 2vw, 1.2rem)',
          '& > li': {
            listStyle: 'square',
          },
        },
        ol: {
          fontSize: 'clamp(1rem, 2vw, 1.2rem)',
        },
        li: {
          '&::marker': {
            color: '#32e0c4',
          },
        },
        '.marker-btn': {
          background: 'none',
          border: 'none',
          cursor: 'pointer',
        },

        blockquote: {
          maxWidth: '800px',
          fontWeight: 600,
          fontStyle: 'italic',
          quotes: '"“" "”"',
          position: 'relative',
          padding: '30px',
          lineHeight: '2rem',
          margin: '0 auto',

          '& > p': {
            color: grey[50],
          },

          '&::before': {
            content: 'open-quote',
            position: 'absolute',
            top: 60,
            left: -20,
            fontSize: '6rem',
            color: '#32e0c4',
          },
        },
        'blockquote.instagram-media': {
          '&::before': {
            content: 'close-quote',
          },
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
