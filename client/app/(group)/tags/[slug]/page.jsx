import BaseCard from "@/components/ui/custom/base-card";
import Link from "next/link";
import { notFound } from "next/navigation";
import CustomPagination from "@/components/ui/custom/pagination";
import { getArticlesByTag, getTagMeta } from "@/lib/data/tags";

export async function generateMetadata({ params }) {
  // read route params
  const { slug } = await params;

  // fetch data
  const { seo } = await getTagMeta(slug);

  return {
    title: seo.metadata.meta_title,
    description: seo.metadata.meta_description,
    robots: {
      index: false,
      follow: true,
      googleBot: {
        index: false,
        follow: true,
      },
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_APP_DOMAIN}/tags/${slug}`,
    },
    openGraph: {
      type: "website",
      url: `${process.env.NEXT_PUBLIC_APP_DOMAIN}/tags/${slug}`,
      title: seo.metadata.meta_title,
      description: seo.metadata.meta_description,
    },
  };
}

export default async function TagPage({ params, searchParams }) {
  const { slug } = await params;
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const limit = 12;
  const start = currentPage * limit - limit;
  const { tag, articles, articlesCountBasedOnTagOrCategory } =
    await getArticlesByTag(slug, start, limit);

  const pageCount = Math.ceil(articlesCountBasedOnTagOrCategory / limit);

  if (!tag) {
    notFound();
  }

  return (
    <main>
      <section
        aria-label={`${tag.name} content`}
        className="flex flex-col justify-center items-center"
      >
        <h1 className="my-8 text-center font-bold uppercase">{tag.name}</h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {articles.map((article) => (
            <div key={article.id}>
              <Link href={`/articles/${article.slug}`}>
                <BaseCard article={article} />
              </Link>
            </div>
          ))}
        </div>
        <div className="my-8" />
        <CustomPagination
          currentPage={currentPage}
          pageCount={Number(pageCount)}
        />
      </section>
    </main>
  );
}
