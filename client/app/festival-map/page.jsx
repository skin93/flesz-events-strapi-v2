import { getMediaUrl } from "@/lib/getMediaUrl";
import LazyMap from "@/components/ui/custom/lazy-map";
import { ALL_FESTIVALS_QUERY } from "@/lib/queries/festivals/allFestivalsQuery";
import { getAllFestivals } from "@/lib/data/festivals";
import { getAllMusicTypes } from "@/lib/data/music-types";

export const revalidate = 60;

export const metadata = {
  title: "Festiwalowa Mapa",
  description: "Sprawdź, czy w Twojej okolicy nie odbywa się fajny festiwal!",
  alternates: {
    canonical: "/festival-map",
  },
  openGraph: {
    url: "/festival-map",
    title: "Festiwalowa Mapa",
    description: "Sprawdź, czy w Twojej okolicy nie odbywa się fajny festiwal!",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_DOMAIN}/FE-mapa-2025-01.jpg`,
        width: 1024,
        height: 683,
        alt: "Festiwalowa Mapa FleszEvents",
      },
    ],
  },
};

export default async function FestivalMap() {
  const { festivals } = await getAllFestivals(ALL_FESTIVALS_QUERY);
  const { genres } = await getAllMusicTypes();

  const markers = festivals.map((fest) => ({
    position: [fest.location?.latitude, fest.location?.longitude],
    popup: fest.name,
    alt: fest.name,
    id: fest.id,
    description: fest.description,
    imageSrc: getMediaUrl(fest.image),
    imageWidth: fest.image.width,
    imageHeight: fest.image.height,
    imageAlt: fest.image.alternativeText,
    slug: fest.slug,
    nextEvent: fest?.next_event,
    date: fest?.next_event?.date,
    fromDate: fest?.next_event?.from_date,
    endDate: fest?.next_event?.to_date,
    tickets: fest?.next_event?.tickets,
    location: fest.location,
    music_types: fest.music_types,
  }));
  return (
    <main className="grid place-content-center">
      <LazyMap markers={markers} genres={genres} />
    </main>
  );
}
