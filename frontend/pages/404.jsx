import { Fade } from "@material-ui/core";
import { Fragment } from "react";

export default function Custom404() {
  return (
    <Fragment>
      <Fade in timeout={200}>
        <div
          style={{
            height: "100vh",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1>404 - Nie odnaleziono strony :(</h1>
        </div>
      </Fade>
    </Fragment>
  );
}
