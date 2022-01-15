import { useEffect, useState, Fragment } from "react";
import Router, { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { DefaultSeo } from "next-seo";
import SEO from "../next-seo.config";
import PropTypes from "prop-types";

import * as gtag from "@/lib/gtag";

import theme from "../theme";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import TheHeader from "@/components/layout/TheHeader";
import TheFooter from "@/components/layout/TheFooter";
import { PageTransition } from "next-page-transitions";

const Loader = dynamic(() => import("@/components/UI/Loader"));

Router.events.on("routeChangeComplete", (url) => gtag.pageview(url));

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
        {loading ? (
          <PageTransition timeout={500} classNames="page-transition">
            <Loader />
          </PageTransition>
        ) : (
          <PageTransition timeout={500} classNames="page-transition">
            <div
              style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
                width: "100%",
              }}
            >
              <TheHeader />
              <main
                component="main"
                style={{
                  margin: "0 auto",
                  overflow: "hidden",
                  width: "100%",
                }}
              >
                <Component key={router.asPath} {...pageProps} />
              </main>
              {router.asPath !== "/festival-map" && <TheFooter />}
            </div>
          </PageTransition>
        )}
      </ThemeProvider>
      <style jsx global>{`
        .page-transition-enter {
          opacity: 0;
        }
        .page-transition-enter-active {
          opacity: 1;
          transition: opacity 300ms;
        }
        .page-transition-exit {
          opacity: 1;
        }
        .page-transition-exit-active {
          opacity: 0;
          transition: opacity 300ms;
        }
      `}</style>
    </Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
