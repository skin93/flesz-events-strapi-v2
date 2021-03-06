import Link from "next/link";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import { getMediaUrl } from "@/lib/getMediaUrl";

const RelatedCard = ({ article }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardMedia
        component="img"
        className={classes.media}
        image={getMediaUrl(article.image_cover)}
        title={article.title}
        alt={article.title}
      />
      <CardContent className={classes.content}>
        <Link href={`/articles/${article.slug}`} passHref>
          <a>
            <Typography
              gutterBottom
              variant="subtitle2"
              component="h4"
              className={classes.title}
            >
              {article.title}
            </Typography>
          </a>
        </Link>
      </CardContent>
    </Card>
  );
};

export default RelatedCard;

const useStyles = makeStyles((theme) => ({
  root: {
    borderRight: "5px solid transparent",
    backgroundColor: "transparent",
    height: "100px",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    boxShadow: "rgba(0, 0, 0, 0.7) 0px 5px 15px",
    transition: ".2s all ease-in-out",
    "&:hover": {
      borderRight: `5px solid ${theme.palette.primary.main}`,
      transform: "translateY(-5px)",
    },
  },
  media: {
    height: "100%",
    width: "100%",
    maxWidth: "150px",
    objectFit: "cover",
    pointerEvents: "none",
  },
  content: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "100%",
  },
  title: {
    paddingInline: "20px",
    fontWeight: 600,
    color: theme.palette.light.main,
    margin: 0,
  },
}));
