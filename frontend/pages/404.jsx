import { Fade } from "@material-ui/core";
import { Fragment } from "react";

export default function Custom404() {
  return (
    <Fragment>
      <Fade in timeout={200}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <h1>404 - Nie odnaleziono strony :(</h1>
        </div>
      </Fade>
    </Fragment>
  );
}
