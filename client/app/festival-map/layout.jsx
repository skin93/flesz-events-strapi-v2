import React, { Fragment } from "react";
import Header from "@/components/layout/header";

export default function FestivalLayout({ children }) {
  return (
    <Fragment>
      <Header />
      {children}
    </Fragment>
  );
}
