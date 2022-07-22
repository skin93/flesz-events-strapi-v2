import { Fragment } from "react";
import dynamic from "next/dynamic";

const MapWithNoSSR = dynamic(() => import("@/components/FestivalMap"), {
  ssr: false,
});

import { ALL_FESTIVALS_QUERY } from "@/lib/queries/festivals/allFestivalsQuery";
import { fetcher } from "@/lib/fetcher";

import { NextSeo } from "next-seo";

const FestivalMapPage = (props) => {
  return (
    <Fragment>
      <NextSeo
        title="Festiwalowa Mapa Polski"
        description="Sprawdź, czy w Twojej okolicy nie odbywa się jakiś fajny festiwal!"
        nofollow={true}
        canonical={`${process.env.NEXT_PUBLIC_APP_DOMAIN}/festival-map`}
        openGraph={{
          title: `Festiwalowa Mapa Polski| ${process.env.NEXT_PUBLIC_APP_NAME}`,
          descirption:
            "Sprawdź, czy w Twojej okolicy nie odbywa się jakiś fajny festiwal!",
          url: `${process.env.NEXT_PUBLIC_APP_DOMAIN}/festival-map`,
          images: [
            {
              url: `${process.env.NEXT_PUBLIC_APP_DOMAIN}/festiwalowa-mapa-polski.jpg`,
              width: 1280,
              height: 720,
              alt: "Festiwalowa Mapa Polski",
            },
          ],
        }}
      />
      <section aria-label="festival-map" style={{ margin: "0" }}>
        <MapWithNoSSR festivals={props.data.festivals} />
      </section>
    </Fragment>
  );
};

export async function getServerSideProps() {
  try {
    const data = await fetcher(ALL_FESTIVALS_QUERY);

    if (!data) {
      return { notFound: true };
    }

    return {
      props: { data },
    };
  } catch (error) {
    return { notFound: true };
  }
}

export default FestivalMapPage;
