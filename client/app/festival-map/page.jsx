import { getMediaUrl } from "@/lib/getMediaUrl";
import LazyMap from "@/components/ui/custom/lazy-map";
import { fetcher } from "@/lib/fetcher";
import { ALL_FESTIVALS_QUERY } from "@/lib/queries/festivals/allFestivalsQuery";

export const metadata = {
  title: "Festiwalowa Mapa",
  description: "Sprawdź, czy w Twojej okolicy nie odbywa się fajny festiwal!",
  keywords: ["Festiwalowa mapa", "festiwale w okolicy", "interaktywna mapa"],
  robots: {
    index: true,
    follow: false,
    googleBot: {
      index: true,
      follow: false,
    },
  },
  alternates: {
    canonical: "/festiwalowa-mapa",
  },
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: process.env.NEXT_PUBLIC_APP_DOMAIN,
    title: process.env.NEXT_PUBLIC_APP_NAME,
    description: "Sprawdź, czy w Twojej okolicy nie odbywa się fajny festiwal!",
    siteName: process.env.NEXT_PUBLIC_APP_NAME,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_DOMAIN}/logo-publikacja.jpeg`,
        width: 1280,
        height: 630,
        alt: "Flesz.Events logo",
      },
    ],
  },
};

export default async function FestivalMap() {
  const { festivals } = await fetcher(ALL_FESTIVALS_QUERY);
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
    // tickets: fest.tickets,
  }));
  return (
    <main className="grid place-content-center">
      <LazyMap markers={markers} />
    </main>
  );
}
