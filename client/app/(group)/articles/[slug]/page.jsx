import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import RelatedArticles from "@/components/ui/custom/related-articles";
import { Separator } from "@/components/ui/separator";
import { fetchWithArgs } from "@/lib/fetcher";
import { getMediaUrl } from "@/lib/getMediaUrl";
import { SINGLE_ARTICLE_META_QUERY } from "@/lib/queries/articles/singleArticleMetaQuery";
import { SINGLE_ARTICLE_QUERY } from "@/lib/queries/articles/singleArticleQuery";
import { formatDateToLocal } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

export async function generateMetadata({ params }) {
  // read route params
  const slug = await params.slug;

  // fetch data
  const { seo } = await fetchWithArgs(SINGLE_ARTICLE_META_QUERY, {
    slug,
  });

  return {
    title: seo[0].metadata.meta_title,
    description: seo[0].metadata.meta_description,
    // keywords: seo[0].keywords,
    robots: {
      index: seo[0].metadata.index,
      follow: seo[0].metadata.follow,
      googleBot: {
        index: seo[0].metadata.index,
        follow: seo[0].metadata.follow,
      },
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_APP_DOMAIN}/articles/${slug}`,
    },
    openGraph: {
      type: "article",
      url: `${process.env.NEXT_PUBLIC_APP_DOMAIN}/articles/${slug}`,
      title: seo[0].metadata.meta_title,
      description: seo[0].metadata.meta_description,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_APP_DOMAIN}/${seo[0].metadata.share_image.media.url}`,
          width: seo[0].metadata.share_image.media.width,
          height: seo[0].metadata.share_image.media.height,
          alt: seo[0].metadata.share_image.media.alternativeText,
        },
      ],
    },
  };
}

export default async function SlugPage({ params }) {
  const slug = params.slug.toString();
  const { articles } = await fetchWithArgs(SINGLE_ARTICLE_QUERY, {
    slug,
  });

  if (!articles) {
    notFound();
  }

  return (
    <main>
      <section className="my-8" aria-label="slug-page">
        <div aria-label="badges" className="mb-4">
          <Link href={`/categories/${articles[0].category?.slug}`}>
            <Badge
              className="dark:bg-accent hover:dark:bg-foreground hover:dark:text-background dark:text-foreground mr-2 p-2 rounded-none uppercase"
              variant="default"
            >
              {articles[0].category?.name}
            </Badge>
          </Link>
          {articles[0].writers?.map((writer) => (
            <Badge
              key={writer.id}
              className=" mr-2 p-2 uppercase border-none"
              variant="outline"
            >
              {writer.name}
            </Badge>
          ))}
          {articles[0].published_at === undefined ? (
            <Badge variant="outline" className=" mr-2 p-2 border-none ">
              {formatDateToLocal(articles[0].createdAt?.toString())}
            </Badge>
          ) : (
            <Badge variant="outline" className=" mr-2 p-2 border-none">
              {formatDateToLocal(articles[0].published_at?.toString())}
            </Badge>
          )}
        </div>
        <h1 aria-label="article-title">{articles[0].title}</h1>
        <Separator className="mb-4 h-[3px]" />
        {/* <div className="grid grid-cols-1 xl:grid-cols-[60%_30%] gap-4 justify-between"> */}
        <article aria-label="left-olumn">
          <AspectRatio
            ratio={16 / 9}
            className="realtive"
            aria-label="image-wrapper"
          >
            <Image
              src={getMediaUrl(articles[0].image_cover)}
              priority
              alt={articles[0].title}
              aria-label="article-cover"
              className="rounded-sm"
              sizes="(min-width: 1560px) 802px, (min-width: 1280px) calc(27.69vw + 376px), calc(100vw - 64px)"
              fill
            />
            <div className="absolute bottom-0 left-0 w-auto h-auto bg-[rgba(0,0,0,0.7)] rounded-bl-sm">
              <p
                aria-label="article-image-caption"
                className="font-bold !text-[#fff] my-0 px-4"
              >
                {articles[0].image_cover.caption}
              </p>
            </div>
          </AspectRatio>
          <Separator className="my-4 h-[3px]" />
          <div
            dangerouslySetInnerHTML={{
              __html: articles[0].content,
            }}
            aria-label="article-content"
            className="embeded-iframe"
          />
          <Separator className="h-[3px]" />
        </article>
        <aside
          className="container justify-center p-0"
          aria-label="right-column"
        >
          {articles[0].related_articles && (
            <RelatedArticles articles={articles[0].related_articles.articles} />
          )}
        </aside>
        {/* </div> */}
      </section>
    </main>
  );
}
