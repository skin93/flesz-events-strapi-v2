import SlugPageComponent from "@/components/slug-page";

import { getArticleBySlug, getArticleMeta } from "@/lib/data/articles";
import { notFound } from "next/navigation";
import { Fragment } from "react";

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
    <Fragment>
      <SlugPageComponent article={article} />
    </Fragment>
  );
}
