"use client";
import React, { useEffect } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import RelatedArticles from "@/components/ui/custom/related-articles";
import { Separator } from "@/components/ui/separator";
import { getMediaUrl } from "@/lib/getMediaUrl";
import { formatDateToLocal } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function SlugPageComponent({ article }) {
  useEffect(() => {
    const figures = document.querySelectorAll(".image");
    figures?.forEach((figure) => {
      const image = figure.querySelector("img");
      const imageSrc = image.getAttribute("src");
      const newImageSrc = `${process.env.NEXT_PUBLIC_STRAPI}${imageSrc}`;
      image.setAttribute("src", newImageSrc);
    });
  }, []);
  return (
    <main>
      <section className="my-6" aria-label="slug-page">
        <div className="my-6">
          <Link href={`/categories/${article.category?.slug}`}>
            <Badge
              className="bg-foreground hover:bg-foreground/70 dark:bg-accent dark:hover:bg-accent/90 dark:text-foreground mr-2 p-2 rounded-sm uppercase"
              variant="default"
            >
              {article.category?.name}
            </Badge>
          </Link>
          {article.writers?.map((writer) => (
            <Badge
              key={writer.id}
              className=" mr-2 p-2 uppercase border-none"
              variant="outline"
            >
              {writer.name}
            </Badge>
          ))}
          {article.published_at === undefined ? (
            <Badge variant="outline" className=" mr-2 p-2 border-none ">
              {formatDateToLocal(article.createdAt?.toString())}
            </Badge>
          ) : (
            <Badge variant="outline" className=" mr-2 p-2 border-none">
              {formatDateToLocal(article.published_at?.toString())}
            </Badge>
          )}
        </div>
        <h1 aria-label="article-title">{article.title}</h1>
        <Separator className="my-6" />
        <div className="grid grid-cols-1 xl:grid-cols-[50%_40%] gap-2 justify-between">
          <article aria-label="left-column">
            <AspectRatio
              ratio={16 / 9}
              className="realtive"
              aria-label="image-wrapper"
            >
              <Image
                src={getMediaUrl(article.image_cover)}
                priority
                alt={article.title}
                aria-label="article-cover"
                placeholder="blur"
                blurDataURL="iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                style={{ objectFit: "cover" }}
                width={article.image_cover.width}
                height={article.image_cover.height}
                className="rounded-sm aspect-video w-full"
              />
              <div className="absolute bottom-0 left-0 w-auto h-auto bg-[rgba(0,0,0,0.7)] rounded-bl-sm">
                <p
                  aria-label="article-image-caption"
                  className="font-bold text-[#fff]! my-0 px-4"
                >
                  {article.image_cover.caption}
                </p>
              </div>
            </AspectRatio>
            <Separator className="my-6" />
            <div
              dangerouslySetInnerHTML={{
                __html: article.content,
              }}
              aria-label="article-content"
              className="embeded-iframe"
            />
            <Separator />
            <h4 className="mb-0"> Tagi:</h4>
            <div className="inline-table my-6">
              {article.tags.map((tag) => (
                <Link key={tag.id} href={`/tags/${tag.slug}`}>
                  <Badge className="uppercase m-2 ml-0" variant="outline">
                    {tag.name}
                  </Badge>
                </Link>
              ))}
            </div>
          </article>
          <aside
            className="container justify-center p-0"
            aria-label="right-column"
          >
            {article.related_articles && (
              <RelatedArticles articles={article.related_articles.articles} />
            )}
          </aside>
        </div>
      </section>
    </main>
  );
}
