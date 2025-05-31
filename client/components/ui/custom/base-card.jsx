import React from "react";
import { Card, CardContent, CardTitle } from "../card";
import Image from "next/image";
import { getMediaUrl } from "@/lib/getMediaUrl";

export default function BaseCard({ article }) {
  return (
    <Card className="group aspect-video w-full border-none relative shadow-none translate-y-0  hover:translate-y-2 transition-all duration-300">
      <CardContent className="p-5 bg-background/5 dark:bg-foreground/5 rounded-lg flex flex-col items-center justify-end ">
        <Image
          loading="lazy"
          width={article.image_cover?.width}
          height={article.image_cover?.height}
          src={getMediaUrl(article.image_cover)}
          title={article.title}
          style={{ objectFit: "cover" }}
          alt={article.image_cover?.alternativeText}
          className="rounded-lg aspect-video w-full "
        />

        <CardTitle className="w-full p-4 text-lg text-center text-foreground dark:no-underline dark:group-hover:text-teal-400 group-hover:underline rounded-b-lg transition-all duration-300">
          {article.title}
        </CardTitle>
      </CardContent>
    </Card>
  );
}
