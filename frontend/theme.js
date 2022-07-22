import { createTheme } from "@material-ui/core/styles";
import { grey, cyan } from "@material-ui/core/colors";

let palette = {
  type: "dark",
  primary: {
    main: "#32e0c4",
  },
  secondary: {
    main: "#63ADF2",
    lighter: "#A6D4FF",
  },
  light: {
    main: grey[50],
  },
  black: {
    main: grey[900],
  },
};

const theme = createTheme({
  overrides: {
    MuiPaper: {
      rounded: {
        borderRadius: 0,
      },
    },
    MuiCardContent: {
      root: {
        padding: "0 !important",
      },
    },
    MuiDialog: {
      paper: {
        position: "relative",
      },
      scrollBody: {
        textAlign: "center",
      },
      paperScrollBody: {
        textAlign: "left",
      },
      paperWidthSm: {
        maxWidth: "640px",
      },
    },
    MuiDialogTitle: {
      root: {
        fontSize: "clamp(2.27rem, calc(2.01rem + 1.29vw), 2.93rem)",
      },
    },
    MuiDialogActions: {
      root: {
        justifyContent: "center",
      },
    },
    MuiTypography: {
      h1: {
        fontSize: "clamp(3.27rem, calc(2.75rem + 2.56vw), 4.58rem)",
      },
      h2: {
        fontSize: " clamp(2.72rem, calc(2.36rem + 1.83vw), 3.66rem)",
      },
      h3: {
        fontSize: "clamp(2.27rem, calc(2.01rem + 1.29vw), 2.93rem)",
      },
      h4: {
        fontSize: "clamp(1.89rem, calc(1.71rem + 0.89vw), 2.34rem)",
      },
      h5: {
        fontSize: "clamp(1.58rem, calc(1.46rem + 0.59vw), 1.88rem)",
      },
      h6: {
        fontsize: "clamp(1.31rem, calc(1.24rem + 0.37vw), 1.50rem)",
      },
      subtitle1: {
        fontSize: "clamp(1.09rem, calc(1.05rem + 0.21vw), 1.20rem)",
      },
      subtitle2: {
        fontSize: "clamp(0.91rem, calc(0.89rem + 0.10vw), 0.96rem)",
      },
      caption: {
        fontSize: "clamp(0.91rem, calc(0.89rem + 0.10vw), 0.96rem)",
      },
    },
    MuiListItem: {
      button: {
        transition: "all .2s ease-in-out",
        "&:hover": {
          backgroundColor: "transparent",
          color: palette.primary.main,
          transform: "scale(1.1)",
        },
      },
    },
    MuiButton: {
      root: {
        transition: "all .2s ease-in-out",
        "&:hover": {
          backgroundColor: "transparent",
          color: palette.primary.main,
          transform: "scale(1.1)",
        },
      },
      text: {
        padding: "none",
      },
    },
    MuiCssBaseline: {
      "@global": {
        figure: {
          display: "block",
          textAlign: "center",
          margin: "30px 0",
          "& > img": {
            width: "100%",
            height: "100%",
            maxHeight: "600px",
            objectFit: "contain",
          },
          "& > figcaption": {
            fontWeight: 700,
            fontSize: "clamp(0.91rem, calc(0.89rem + 0.10vw), 0.96rem)",
          },
        },
        ".raw-html-embed": {
          position: "relative",
          boxShadow: "rgba(0, 0, 0, 0.7) 0px 5px 15px",
          overflow: "hidden",
          width: "100%",
          paddingTop: "56.25%",

          "& > iframe": {
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
          },
          "& iframe.fb": {
            backgroundColor: grey[50],
            boxShadow: "none",
            height: "100%",
            position: "relative",
          },
        },
        body: {
          padding: 0,
          margin: 0,
          lineHeight: "1.5",
          backgroundColor: grey[900],
          "& ::selection": {
            backgroundColor: grey[900],
            color: palette.primary.main,
          },
        },

        h1: {
          fontSize: "clamp(3.27rem, calc(2.75rem + 2.56vw), 4.58rem)",
        },
        h2: {
          fontSize: " clamp(2.72rem, calc(2.36rem + 1.83vw), 3.66rem)",
        },
        h3: {
          fontSize: "clamp(2.27rem, calc(2.01rem + 1.29vw), 2.93rem)",
        },
        h4: {
          fontSize: "clamp(1.89rem, calc(1.71rem + 0.89vw), 2.34rem)",
        },
        h5: {
          fontSize: "clamp(1.58rem, calc(1.46rem + 0.59vw), 1.88rem)",
        },
        h6: {
          fontsize: "clamp(1.31rem, calc(1.24rem + 0.37vw), 1.50rem)",
        },
        p: {
          fontSize: "clamp(1.09rem, calc(1.05rem + 0.21vw), 1.20rem)",
          color: grey[500],
          fontWeight: 400,
        },
        span: {
          fontSize: "clamp(0.91rem, calc(0.89rem + 0.10vw), 0.96rem)",
        },
        ul: {
          fontSize: "clamp(1.09rem, calc(1.05rem + 0.21vw), 1.20rem)",
          "& > li": {
            listStyle: "square",
          },
        },
        ol: {
          fontSize: "clamp(1.09rem, calc(1.05rem + 0.21vw), 1.20rem)",
        },
        li: {
          "&::marker": {
            color: palette.primary.main,
          },

          "& > s": {
            color: grey[400],
          },
        },

        ".marker-btn": {
          background: "none",
          border: "none",
          cursor: "pointer",
        },

        blockquote: {
          position: "relative",
          fontWeight: 800,
          fontStyle: "italic",
          lineHeight: "2rem",
          letterSpacing: "2px",
          padding: "30px 0",
          width: "100%",
          maxWidth: "500px",
          zIndex: 1,
          margin: "1rem auto",
          lineHeight: "2rem",
          borderTop: `solid 1px ${palette.primary.main} `,
          borderBottom: `solid 1px ${palette.primary.main} `,
          backgroundColor: "transparent",

          "& p": {
            color: grey[50],
          },
        },
        span: {
          backgroundColor: "transparent",
        },
        a: {
          color: palette.secondary.main,
          textDecoration: "none",
          transition: "color .3s ease-in-out",

          "& > strong": {
            color: palette.secondary.main,
          },

          "&:hover": {
            color: palette.secondary.lighter,
          },
        },
        strong: {
          color: grey[50],
          fontWeight: 900,
        },
      },
    },
  },
  palette,
});

export default theme;
