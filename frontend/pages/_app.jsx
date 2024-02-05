import { useEffect, useState, Fragment } from "react";
import { useRouter } from "next/router";
import { DefaultSeo } from "next-seo";
import SEO from "../next-seo.config";
import PropTypes from "prop-types";

import theme from "../theme";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import TheHeader from "@/components/layout/TheHeader";
import TheFooter from "@/components/layout/TheFooter";

export default function MyApp(props) {
  const router = useRouter();
  const { Component, pageProps } = props;

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
  }, [router]);

  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <Fragment>
      <DefaultSeo {...SEO} />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <TheHeader />
        <Component key={router.asPath} {...pageProps} />
        {router.asPath !== "/festival-map" && <TheFooter />}
      </ThemeProvider>
    </Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
