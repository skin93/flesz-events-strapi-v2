import BaseCard from "@/components/ui/custom/base-card";
import Link from "next/link";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import Loading from "./loading";
import { fetchWithArgs } from "@/lib/fetcher";
import { SINGLE_CATEGORY_QUERY } from "@/lib/queries/categories/singleCategoryQuery";

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   // read route params
//   const category = params.category;

//   // fetch data
//   const { seo } = await getCategoryMeta(category);

//   return {
//     title: seo.metaTitle,
//     description: seo.metaDescription,
//     robots: {
//       index: seo.robotsIndex,
//       follow: seo.robotsFollow,
//       googleBot: {
//         index: seo.googlebotIndex,
//         follow: seo.googlebotFollow,
//       },
//     },
//     alternates: {
//       canonical: seo.canonicalURL,
//     },
//     openGraph: {
//       url: seo.canonicalURL,
//       title: seo.metaSocial[0].title,
//       description: seo.metaSocial[0].description,
//       images: [
//         {
//           url: `${process.env.NEXT_PUBLIC_APP_DOMAIN}/${seo.metaSocial[0].image?.data.attributes.url}`,
//           width: seo.metaSocial[0].image?.data.attributes.width,
//           height: seo.metaSocial[0].image?.data.attributes.height,
//           alt: seo.metaSocial[0].image?.data.attributes.alternativeText,
//         },
//       ],
//     },
//   };
// }

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
          <Suspense fallback={<Loading />}>
            {articles.map((article) => (
              <div key={article.id}>
                <Link href={`/articles/${article.slug}`}>
                  <BaseCard article={article} />
                </Link>
              </div>
            ))}
          </Suspense>
        </div>
        <div className="m-8" />
      </section>
    </main>
  );
}
