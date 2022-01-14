import { CircularProgress, Fade } from "@material-ui/core";

const Loader = () => {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress size="10rem" color="primary" />
    </div>
  );
};

export default Loader;
