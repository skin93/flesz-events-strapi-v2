import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import RelatedArticles from "@/components/ui/custom/related-articles";
import { Separator } from "@/components/ui/separator";
import { getArticleBySlug, getArticleMeta } from "@/lib/data/articles";
import { getMediaUrl } from "@/lib/getMediaUrl";
import { formatDateToLocal } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

export async function generateMetadata({ params }) {
  // read route params
  const { slug } = await params;

  // fetch data
  const { seo } = await getArticleMeta(slug);

  return {
    title: seo.metadata.meta_title,
    description: seo.metadata.meta_description,
    // keywords: seo.keywords,
    robots: {
      index: seo.metadata.index,
      follow: seo.metadata.follow,
      googleBot: {
        index: seo.metadata.index,
        follow: seo.metadata.follow,
      },
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_APP_DOMAIN}/articles/${slug}`,
    },
    openGraph: {
      type: "article",
      url: `${process.env.NEXT_PUBLIC_APP_DOMAIN}/articles/${slug}`,
      title: seo.metadata.meta_title,
      description: seo.metadata.meta_description,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_STRAPI}/${seo.metadata.share_image.media.url}`,
          width: seo.metadata.share_image.media.width,
          height: seo.metadata.share_image.media.height,
          alt: seo.metadata.share_image.media.alternativeText,
        },
      ],
    },
  };
}

export default async function SlugPage({ params }) {
  const { slug } = await params;
  const { article } = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <main>
      <section className="my-8" aria-label="slug-page">
        <div className="mb-4">
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
        <Separator className="mb-4" />
        {/* <div className="grid grid-cols-1 xl:grid-cols-[60%_30%] gap-4 justify-between"> */}
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
              style={{ objectFit: "cover" }}
              className="rounded-sm aspect-video"
              sizes="(min-width: 1560px) 802px, (min-width: 1280px) calc(27.69vw + 376px), calc(100vw - 64px)"
              fill
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
          <Separator className="my-4" />
          <div
            dangerouslySetInnerHTML={{
              __html: article.content,
            }}
            aria-label="article-content"
            className="embeded-iframe"
          />
          <Separator />
        </article>
        <aside
          className="container justify-center p-0"
          aria-label="right-column"
        >
          {article.related_articles && (
            <RelatedArticles articles={article.related_articles.articles} />
          )}
        </aside>
        {/* </div> */}
      </section>
    </main>
  );
}
