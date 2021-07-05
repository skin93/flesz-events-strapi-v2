import { createMuiTheme } from '@material-ui/core/styles';
import white from '@material-ui/core/colors';

const theme = createMuiTheme({
  // overrides: {
  //   MuiCssBaseline: {
  //     '@global': {
  //       figure: {
  //         textAlign: 'center',
  //         margin: '30px 0',
  //         '& img': {
  //           width: '60%',
  //           height: 'auto',
  //         },
  //       },
  //       '.iframe-container': {
  //         position: 'relative',
  //         overflow: 'hidden',
  //         width: '100%',
  //         paddingTop: '56.25%',

  //         '& iframe': {
  //           position: 'absolute',
  //           top: '50%',
  //           left: '50%',
  //           transform: 'translate(-50%,-50%)',
  //           width: '80%',
  //           height: '80%',
  //         },
  //       },
  //       body: {
  //         padding: 0,
  //         margin: 0,
  //         backgroundColor: '#fff',
  //       },
  //       blockquote: {
  //         fontWeight: 600,
  //         fontStyle: 'italic',
  //         quotes: `"“" "”"`,
  //         position: 'relative',
  //         '&::before': {
  //           content: 'open-quote',
  //           position: 'absolute',
  //           top: 60,
  //           left: -40,
  //           fontSize: '6em',
  //           color: '#32e0c4',
  //         },
  //         backgroundColor: 'transparent',
  //         color: `rgba(255, 255, 255, 0.9)`,
  //         padding: `30px`,
  //         lineHeight: `2em`,
  //         margin: `30px auto`,
  //         width: `80%`,
  //         fontSize: 'calc(.7rem + .5vw)',
  //       },
  //       h2: {
  //         color: `#eee`,
  //         fontWeight: 'bold',
  //         fontSize: 'calc(1rem + 1vw)',
  //       },
  //       p: {
  //         fontSize: 'calc(.7rem + .5vw)',
  //         lineHeight: '1.5',
  //       },
  //       a: {
  //         color: '#32e0c4',
  //         textDecoration: `none`,
  //       },
  //       strong: {
  //         color: `#eee`,
  //       },
  //       ul: {
  //         paddingLeft: '15px',
  //         margin: '30px 0',
  //       },
  //       ol: {
  //         paddingLeft: '15px',
  //         margin: '30px 0',
  //       },
  //       li: {
  //         margin: `10px 0`,
  //         fontSize: 'calc(.7rem + .5vw)',
  //         '&::marker': {
  //           color: '#32e0c4',
  //         },
  //       },
  //       ul: {
  //         li: {
  //           listStyle: `square`,
  //         },
  //       },
  //     },
  //   },
  // },
  palette: {
    primary: {
      main: '#32e0c4',
    },
    type: 'light',
    accent: {
      main: '#32e0c4',
    },
    light: {
      main: '#eee',
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
  // typography: {
  //   fontFamily: ['Lato', 'sans-serif'].join(','),
  //   h1: {
  //     fontSize: `3rem`,
  //   },
  //   subtitle1: {
  //     fontSize: `1.2rem`,
  //     fontWeight: `bold`,
  //   },
  // },
});

export default theme;
