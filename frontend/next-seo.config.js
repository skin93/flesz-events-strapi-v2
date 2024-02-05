export default {
  titleTemplate: ` %s | ${process.env.NEXT_PUBLIC_APP_NAME}`,
  defaultTitle: process.env.NEXT_PUBLIC_APP_NAME,
  description: "Jesteśmy sKoncentrowani na muzyce!",
  canonical: process.env.NEXT_PUBLIC_APP_DOMAIN,
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: process.env.NEXT_PUBLIC_APP_DOMAIN,
    title: process.env.NEXT_PUBLIC_APP_NAME,
    description: "Jesteśmy sKoncentrowani na muzyce!",
    site_name: process.env.NEXT_PUBLIC_APP_NAME,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_DOMAIN}/logo-publikacja.jpeg`,
        width: 1200,
        height: 628,
        alt: "Flesz.Events logo",
      },
    ],
  },
  facebook: {
    appId: process.env.NEXT_PUBLIC_FB_ID,
  },
};
