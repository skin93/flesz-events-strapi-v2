import BaseCard from "@/components/ui/custom/base-card";
import Link from "next/link";
import { Suspense } from "react";
import { Separator } from "@/components/ui/separator";
import { ReadMoreLink } from "@/components/ui/custom/button-link";
import { notFound } from "next/navigation";
import Loading from "./loading";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { fetchWithArgs } from "@/lib/fetcher";
import { PROMO_ARTICLES_QUERY } from "@/lib/queries/articles/promoArticlesQuery";
import { LATEST_NEWS_QUERY } from "@/lib/queries/articles/latestNewsQuery";
import { LATEST_FESTIVALS_QUERY } from "@/lib/queries/articles/latestFestivalsQuery";
import { LATEST_CONCERTS_QUERY } from "@/lib/queries/articles/latesConcertsQuery";
import { LATEST_SINGLES_QUERY } from "@/lib/queries/articles/latestSinglesQuery";

export default async function HomePage() {
  const { promo } = await fetchWithArgs(PROMO_ARTICLES_QUERY, {
    start: 0,
    limit: 6,
  });
  const { news } = await fetchWithArgs(LATEST_NEWS_QUERY, {
    start: 0,
    limit: 6,
  });
  const { festivals } = await fetchWithArgs(LATEST_FESTIVALS_QUERY, {
    start: 0,
    limit: 6,
  });
  const { concerts } = await fetchWithArgs(LATEST_CONCERTS_QUERY, {
    start: 0,
    limit: 6,
  });
  const { singles } = await fetchWithArgs(LATEST_SINGLES_QUERY, {
    start: 0,
    limit: 6,
  });

  if (!promo || !news || !concerts || !festivals || !singles) {
    notFound();
  }

  return (
    <main>
      <section
        aria-label="Promo events"
        className="flex flex-col justify-center items-center my-8"
      >
        <h1 className="mb-8 text-center text-4xl font-bold">POLECAMY</h1>
        <Carousel
          opts={{
            align: "center",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {promo.map((promo) => (
              <CarouselItem
                key={promo.id}
                className="basis md:basis-1/2 xl:basis-1/3"
              >
                <div key={promo.id}>
                  <Link href={`/articles/${promo.slug}`}>
                    <BaseCard article={promo} />
                  </Link>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>
      <Separator />
      <section
        aria-label="Latest news"
        className="flex flex-col justify-center items-center"
      >
        <h1 className="m-8 text-center text-4xl font-bold">OSTATNIE NEWSY</h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <Suspense fallback={<Loading />}>
            {news.map((article) => (
              <div key={article.id}>
                <Link href={`/articles/${article.slug}`}>
                  <BaseCard article={article} />
                </Link>
              </div>
            ))}
          </Suspense>
        </div>
        <ReadMoreLink
          href="/categories/newsy"
          className="m-8 border-accent font-bold"
        />
      </section>
      <Separator />
      <section
        aria-label="Latest news"
        className="flex flex-col justify-center items-center"
      >
        <h1 className="m-8 text-center text-4xl font-bold">NAJNOWSZE SINGLE</h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <Suspense fallback={<Loading />}>
            {singles.map((article) => (
              <div key={article.id}>
                <Link href={`/articles/${article.slug}`}>
                  <BaseCard article={article} />
                </Link>
              </div>
            ))}
          </Suspense>
        </div>
        <ReadMoreLink
          href="/categories/single"
          className="m-8 border-accent font-bold"
        />{" "}
      </section>
      <Separator />
      <section
        aria-label="Latest concerts"
        className="flex flex-col justify-center items-center"
      >
        <h1 className="m-8 text-center text-4xl font-bold">
          OGŁOSZONE KONCERTY
        </h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <Suspense fallback={<Loading />}>
            {concerts.map((article) => (
              <div key={article.id}>
                <Link href={`/articles/${article.slug}`}>
                  <BaseCard article={article} />
                </Link>
              </div>
            ))}
          </Suspense>
        </div>
        <ReadMoreLink
          href="/categories/koncerty"
          className="m-8 border-accent font-bold"
        />
      </section>
      <Separator />
      <section
        aria-label="Latest festivals"
        className="flex flex-col justify-center items-center"
      >
        <h1 className="m-8 text-center text-4xl font-bold">
          OGŁOSZONE FESTIWALE
        </h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <Suspense fallback={<Loading />}>
            {festivals.map((article) => (
              <div key={article.id}>
                <Link href={`/articles/${article.slug}`}>
                  <BaseCard article={article} />
                </Link>
              </div>
            ))}
          </Suspense>
        </div>
        <ReadMoreLink
          href="/categories/festiwale"
          className="m-8 border-accent font-bold"
        />
      </section>
    </main>
  );
}
