import { Fragment } from "react";
import dynamic from "next/dynamic";

const MapWithNoSSR = dynamic(() => import("@/components/FestivalMap"), {
  ssr: false,
});

import { ALL_FESTIVALS_QUERY } from "@/lib/queries/festivals/allFestivalsQuery";
import { fetcher } from "@/lib/fetcher";

import { NextSeo } from "next-seo";
import Fade from "@material-ui/core/Fade";

const FestivalMapPage = (props) => {
  return (
    <main>
      <NextSeo
        title="Festiwalowa Mapa"
        description="Najciekawsze festiwale w Polsce oraz w Europie"
        nofollow={true}
        canonical={`${process.env.NEXT_PUBLIC_APP_DOMAIN}/festival-map`}
        openGraph={{
          title: `Festiwalowa Mapa Polski| ${process.env.NEXT_PUBLIC_APP_NAME}`,
          descirption: "Najciekawsze festiwale w Polsce oraz w Europie",
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
      <Fade in timeout={200}>
        <section aria-label="festival-map">
          <MapWithNoSSR festivals={props.data.festivals} />
        </section>
      </Fade>
    </main>
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
    throw new Error("Internal Server Error");
  }
}

export default FestivalMapPage;
