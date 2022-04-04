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
        fontSize: "3rem",
      },
    },
    MuiDialogActions: {
      root: {
        justifyContent: "center",
      },
    },
    MuiTypography: {
      h1: {
        fontSize: "clamp(2rem, 3vw, 4rem)",
      },
      h4: {
        fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
      },
      subtitle1: {
        fontSize: "clamp(1rem, 2vw, 1.2rem)",
      },
      subtitle2: {
        fontSize: "clamp(.5rem, 3vw, .8rem)",
      },
      caption: {
        fontSize: "clamp(.6rem, 2vw, .8rem)",
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
            fontSize: ".75rem",
            fontSize: "clamp(.6rem, 2vw, .8rem)",
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
          fontSize: "clamp(2rem, 3vw, 3rem)",
        },
        h2: {
          fontSize: "clamp(1.7rem, 3vw, 2.5rem)",
        },
        h3: {
          fontSize: "clamp(1.4rem, 3vw, 2rem)",
        },
        h4: {
          fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
        },
        p: {
          fontSize: "clamp(1rem, 2vw, 1.2rem)",
          color: grey[500],
          fontWeight: 400,
        },
        ul: {
          fontSize: "clamp(1rem, 2vw, 1.2rem)",
          "& > li": {
            listStyle: "square",
          },
        },
        ol: {
          fontSize: "clamp(1rem, 2vw, 1.2rem)",
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
          fontStyle: "italic",
          fontWeight: 100,
          padding: "1em",
          lineHeight: "2rem",
          letterSpacing: "2px",
          margin: "1rem auto",
          borderLeft: "10px solid #32e0c4",
          backgroundColor: "transparent",
          color: "#eee",
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
