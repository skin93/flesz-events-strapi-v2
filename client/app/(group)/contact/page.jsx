import React from "react";

export const metadata = {
  title: "Kontakt",
  description:
    "Chcesz wysłać wiadomość? Sprawdź, w jaki sposób możesz nawiązać kontakt!",
  robots: {
    index: true,
    follow: false,
    googleBot: {
      index: true,
      follow: false,
    },
  },
  alternates: {
    canonical: "/kontakt",
  },
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: process.env.NEXT_PUBLIC_APP_DOMAIN,
    title: process.env.NEXT_PUBLIC_APP_NAME,
    description: "Sprawdź, w jaki sposób możesz nawiązać kontakt!",
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

export default function ContactPage() {
  return (
    <main>
      <section className="flex flex-col items-center justify-center ">
        <h1 className="my-8 text-center font-bold uppercase">KONTAKT</h1>
        <p className="my-0">
          Organizujesz festiwal albo w Twojej okolicy odbywa się ciekawe
          wydarzenie? Masz zespół, wydajecie album/singiel albo gracie niedługo
          koncert i szukacie patronatu? A może po prostu potrzebujesz nawiązać
          kontakt? Wyślij wiadomość na <strong>kontakt@fleszevents.pl</strong>
        </p>
      </section>
    </main>
  );
}
