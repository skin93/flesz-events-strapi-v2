import BaseCard from "@/components/ui/custom/base-card";
import { connection } from "next/server";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { ReadMoreLink } from "@/components/ui/custom/button-link";
import { notFound } from "next/navigation";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { fetchWithArgs } from "@/lib/fetcher";
import { LATEST_ARTICLES_QUERY } from "@/lib/queries/articles/latestArticlesQuery";

export default async function HomePage() {
  await connection();
  const { promo, news, concerts, festivals, singles } = await fetchWithArgs(
    LATEST_ARTICLES_QUERY,
    {
      start: 0,
      limit: 6,
    }
  );

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
          {news.map((article) => (
            <div key={article.id}>
              <Link href={`/articles/${article.slug}`}>
                <BaseCard article={article} />
              </Link>
            </div>
          ))}
        </div>
        <ReadMoreLink href="/categories/newsy" />
      </section>
      <Separator />
      <section
        aria-label="Latest news"
        className="flex flex-col justify-center items-center"
      >
        <h1 className="m-8 text-center text-4xl font-bold">NAJNOWSZE SINGLE</h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {singles.map((article) => (
            <div key={article.id}>
              <Link href={`/articles/${article.slug}`}>
                <BaseCard article={article} />
              </Link>
            </div>
          ))}
        </div>
        <ReadMoreLink href="/categories/single" />{" "}
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
          {concerts.map((article) => (
            <div key={article.id}>
              <Link href={`/articles/${article.slug}`}>
                <BaseCard article={article} />
              </Link>
            </div>
          ))}
        </div>
        <ReadMoreLink href="/categories/koncerty" />
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
          {festivals.map((article) => (
            <div key={article.id}>
              <Link href={`/articles/${article.slug}`}>
                <BaseCard article={article} />
              </Link>
            </div>
          ))}
        </div>
        <ReadMoreLink href="/categories/festiwale" />
      </section>
    </main>
  );
}
