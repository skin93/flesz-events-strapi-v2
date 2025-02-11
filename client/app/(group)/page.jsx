import { Separator } from "@/components/ui/separator";
import { notFound } from "next/navigation";
import { fetchWithArgs } from "@/lib/fetcher";
import { LATEST_ARTICLES_QUERY } from "@/lib/queries/articles/latestArticlesQuery";
import Promo from "@/components/homepage/promo";
import CategoryBlock from "@/components/homepage/categoryBlock";

export const revalidate = 60;

export default async function HomePage() {
  const { concerts, festivals, promo, singles, news } = await fetchWithArgs(
    LATEST_ARTICLES_QUERY,
    {
      start: 0,
      limit: 6,
    }
  );

  if (!concerts || !festivals || !singles || !news || !promo) {
    notFound();
  }

  return (
    <main>
      <Promo promo={promo[0].articles} />
      <Separator />
      <CategoryBlock
        articles={news[0].articles}
        name="news"
        slug={news[0].slug}
      />
      <Separator />
      <CategoryBlock
        articles={singles[0].articles}
        name="singles"
        slug={singles[0].slug}
      />
      <Separator />
      <CategoryBlock
        articles={concerts[0].articles}
        name="concerts"
        slug={concerts[0].slug}
      />
      <Separator />
      <CategoryBlock
        articles={festivals[0].articles}
        name="festivals"
        slug={festivals[0].slug}
      />
    </main>
  );
}
