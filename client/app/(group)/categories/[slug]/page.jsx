import BaseCard from "@/components/ui/custom/base-card";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import { fetchWithArgs } from "@/lib/fetcher";
import { SINGLE_CATEGORY_META_QUERY } from "@/lib/queries/categories/singleCategoryMetaQuery";
import { SINGLE_CATEGORY_QUERY } from "@/lib/queries/categories/singleCategoryQuery";

export async function generateMetadata({ params }) {
  // read route params
  const { slug } = await params;

  // fetch data
  const { seo } = await fetchWithArgs(SINGLE_CATEGORY_META_QUERY, {
    slug,
  });

  return {
    title: seo[0].metadata.meta_title,
    description: seo[0].metadata.meta_description,
    robots: {
      index: false,
      follow: true,
      googleBot: {
        index: false,
        follow: true,
      },
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_APP_DOMAIN}/categories/${slug}`,
    },
    openGraph: {
      type: "website",
      url: `${process.env.NEXT_PUBLIC_APP_DOMAIN}/categories/${slug}`,
      title: seo[0].metadata.meta_title,
      description: seo[0].metadata.meta_description,
    },
  };
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const { categories } = await fetchWithArgs(SINGLE_CATEGORY_QUERY, {
    slug,
  });

  if (!categories[0]) {
    notFound();
  }

  const articles = categories[0].articles;

  return (
    <main>
      <section
        aria-label={`${categories[0].name} content`}
        className="flex flex-col justify-center items-center"
      >
        <h1 className="my-8 text-center text-4xl font-bold uppercase">
          {categories[0].name}
        </h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {articles.map((article) => (
            <div key={article.id}>
              <Link href={`/articles/${article.slug}`}>
                <BaseCard article={article} />
              </Link>
            </div>
          ))}
        </div>
        <div className="m-8" />
      </section>
    </main>
  );
}
