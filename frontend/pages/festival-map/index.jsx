import { Fragment } from "react";
import dynamic from "next/dynamic";

const MapWithNoSSR = dynamic(() => import("@/components/FestivalMap"), {
  ssr: false,
});

import { ALL_FESTIVALS_QUERY } from "@/lib/queries/festivals/allFestivalsQuery";
import { fetcher } from "@/lib/fetcher";

import SEO from "@/components/SEO";

const FestivalMapPage = (props) => {
  return (
    <Fragment>
      <SEO
        public_image="%PUBLIC_URL%/festiwalowa-mapa-polski.png"
        meta_title="Festiwalowa mapa Polski"
        meta_description="Sprawdź, czy w Twojej okolicy nie odbywa się jakiś fajny festiwal!"
        follow={false}
        index={true}
      />
      <section aria-label="festival-map">
        <MapWithNoSSR festivals={props.data.festivals} />
      </section>
    </Fragment>
  );
};

export async function getStaticProps() {
  try {
    const data = await fetcher(ALL_FESTIVALS_QUERY, {});

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
