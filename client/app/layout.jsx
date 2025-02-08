import { Inter } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata() {
  return {
    generator: "Next.js",
    applicationName: process.env.NEXT_PUBLIC_APP_NAME,
    title: {
      template: `%s | ${process.env.NEXT_PUBLIC_APP_NAME}`,
      default: `${process.env.NEXT_PUBLIC_APP_NAME}`,
    },
    description: "Festiwalowa mapa oraz zapowiedzi koncertów",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    metadataBase: new URL(`${process.env.NEXT_PUBLIC_APP_DOMAIN}`),
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "website",
      locale: "pl_PL",
      url: process.env.NEXT_PUBLIC_APP_DOMAIN,
      title: process.env.NEXT_PUBLIC_APP_NAME,
      description: "Festiwalowa mapa oraz zapowiedzi koncertów",
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
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          {/* <Footer /> */}
        </ThemeProvider>
      </body>
    </html>
  );
}
