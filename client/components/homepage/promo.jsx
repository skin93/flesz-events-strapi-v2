import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Link from "next/link";
import BaseCard from "../ui/custom/base-card";

export default function Promo({ promo }) {
  return (
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
  );
}
