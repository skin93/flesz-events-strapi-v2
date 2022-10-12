import { useEffect, useState, Fragment } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { DefaultSeo } from "next-seo";
import SEO from "../next-seo.config";
import PropTypes from "prop-types";

import TagManager from "react-gtm-module";

import theme from "../theme";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import TheHeader from "@/components/layout/TheHeader";
import TheFooter from "@/components/layout/TheFooter";
import { PageTransition } from "next-page-transitions";

const Loader = dynamic(() => import("@/components/UI/Loader"));

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

  useEffect(() => {
    TagManager.initialize({ gtmId: process.env.NEXT_PUBLIC_GTM });
  }, []);

  return (
    <Fragment>
      <DefaultSeo {...SEO} />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <TheHeader />
        <main>
          <Component key={router.asPath} {...pageProps} />
        </main>
        {router.asPath !== "/festival-map" && <TheFooter />}
      </ThemeProvider>
    </Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
