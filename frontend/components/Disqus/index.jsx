import { DiscussionEmbed } from "disqus-react";
import { makeStyles } from "@material-ui/core/styles";

const Disqus = ({ article }) => {
  const classes = useStyles();
  const disqusShortname = "flesz-events";
  const disqusConfig = {
    url: `${process.env.NEXT_PUBLIC_APP_DOMAIN}/articles/${article.slug}`,
    identifier: article.id,
    title: article.title,
  };
  return (
    <div className={classes.root}>
      <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
    </div>
  );
};
export default Disqus;

const useStyles = makeStyles({
  root: {
    margin: "30px 0",
  },
});
