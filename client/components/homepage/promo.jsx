"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import BaseCard from "../ui/custom/base-card";
import { useRef } from "react";

export default function Promo({ promo }) {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
  return (
    <section
      aria-label="Promo events"
      className="flex flex-col justify-center items-center my-8"
    >
      <h1 className="mb-8 text-center font-bold">POLECAMY</h1>
      <Carousel
        plugins={[plugin.current]}
        opts={{
          align: "start",
          loop: true,
          plugin,
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
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </section>
  );
}
