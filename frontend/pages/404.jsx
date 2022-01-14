import { Fragment } from "react";

export default function Custom404() {
  return (
    <Fragment>
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
    </Fragment>
  );
}
