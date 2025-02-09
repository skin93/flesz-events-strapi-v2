import { Article } from "@/lib/interfaces/myTypes";
import React from "react";
import { Card, CardContent, CardTitle } from "../card";
import Image from "next/image";
import { getMediaUrl } from "@/lib/getMediaUrl";
import { AspectRatio } from "../aspect-ratio";

export default function RelatedCard({ article }) {
  return (
    <AspectRatio ratio={16 / 9}>
      <Card className="relative border-l-[5px] border-transparent border-solid w-full h-full translate-x-0 transition-all hover:border-l-[#8001b2] hover:translate-x-[5px]">
        <Image
          priority
          src={getMediaUrl(article.cover)}
          title={article.title}
          alt={article.cover?.alternativeText}
          style={{ objectFit: "cover" }}
          className="rounded-sm aspect-video"
          fill
        />

        <CardContent className="py-0 px-4 flex justify-start items-center absolute h-[50px] w-full bottom-0 bg-[rgba(0,0,0,0.7)] z-100 rounded-b-sm">
          <CardTitle className="text-sm mx-auto font-bold text-background dark:text-foreground">
            {article.title}
          </CardTitle>
        </CardContent>
      </Card>
    </AspectRatio>
  );
}
