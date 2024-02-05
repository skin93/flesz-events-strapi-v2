import { Fade } from "@material-ui/core";
import { Fragment } from "react";

export default function Custom500() {
  return (
    <main>
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
          <h1>500 - Błąd serwera :(</h1>
        </div>
      </Fade>
    </main>
  );
}
