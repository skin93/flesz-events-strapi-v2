import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Link from "next/link";

const LinkButton = ({ href, title }) => {
  const classes = useStyles();

  return (
    <Link href={href} key={title} passHref>
      <a className={classes.linkText}>
        <Button>{title}</Button>
      </a>
    </Link>
  );
};

export default LinkButton;

const useStyles = makeStyles((theme) => ({
  linkText: {
    textDecoration: "none",
    textTransform: "uppercase",
    color: theme.palette.light.main,
  },
}));
