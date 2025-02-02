import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function Loading() {
  return (
    <main>
      <section className="my-8 w-[350px] sm:w-[640px] md:w-[768px] lg:w-[1024px] xl:w-[1280px] px-8">
        <div className="flex flex-row gap-4">
          <Skeleton className="w-[50px] sm:w-[75px] md:w-[100px] xl:w-[165px] h-[33px] rounded-none" />
          <Skeleton className="w-[50px] sm:w-[75px] md:w-[100px] xl:w-[165px] h-[33px] rounded-none" />
          <Skeleton className="w-[50px] sm:w-[75px] md:w-[100px] xl:w-[165px] h-[33px] rounded-none" />
        </div>
        <Skeleton className="w-full h-[50px] my-4 rounded-none" />
        <Skeleton className="w-full h-[3px] my-4" />
        <div className="min-h-screen w-full">
          <Skeleton className="aspect-video w-full h-100 rounded-sm" />
          <Skeleton className="w-full h-[3px] my-4" />
          <Skeleton className="w-full h-[100px] my-4 rounded-none" />
          <Skeleton className="w-full h-[100px] my-4 rounded-none" />
          <Skeleton className="w-full h-[100px] my-4 rounded-none" />
          <Skeleton className="w-full h-[100px] my-4 rounded-none" />
          <Skeleton className="w-full h-[3px] my-4" />
        </div>

        <div className="container justify-center p-0">
          <Skeleton className="w-[75%] h-[50px] rounded-none" />
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:flex xl:flex-col justify-center gap-4 mx-auto">
            <Skeleton className="aspect-video w-full h-100 my-4 rounded-sm" />
            <Skeleton className="aspect-video w-full h-100 my-4 rounded-sm" />
            <Skeleton className="aspect-video w-full h-100 my-4 rounded-sm" />
          </div>
        </div>
      </section>
    </main>
  );
}
