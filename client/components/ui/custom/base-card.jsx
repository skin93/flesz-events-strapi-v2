import React from "react";
import { Card, CardContent, CardTitle } from "../card";
import Image from "next/image";
import { getMediaUrl } from "@/lib/getMediaUrl";

export default function BaseCard({ article }) {
  return (
    <Card className="group aspect-video w-full border-none relative">
      <Image
        priority
        width={article.image_cover?.width}
        height={article.image_cover?.height}
        src={getMediaUrl(article.image_cover)}
        title={article.title}
        alt={article.image_cover?.alternativeText}
        className="rounded-lg aspect-video object-cover"
        sizes="(min-width: 1560px) 435px, (min-width: 1280px) calc(15.38vw + 198px), (min-width: 640px) calc(50vw - 40px), (min-width: 460px) calc(100vw - 64px), calc(7.86vw + 341px)"
      />
      <CardContent className="absolute inset-0 bg-[rgba(0,0,0,0.7)] rounded-lg flex flex-col  items-center justify-end group-hover:bg-[rgba(0,0,0,0.3)] transition-all">
        <CardTitle className="text-lg text-[#fff]!">{article.title}</CardTitle>
      </CardContent>
    </Card>
  );
}
