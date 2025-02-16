import { Separator } from "@/components/ui/separator";
import { notFound } from "next/navigation";
import Promo from "@/components/homepage/promo";
import CategoryBlock from "@/components/homepage/categoryBlock";
import { getLatestArticles } from "@/lib/data/articles";

export const revalidate = 60;

export default async function HomePage() {
  const { concerts, festivals, promo, singles, news } = await getLatestArticles(
    0,
    6
  );

  if (!concerts || !festivals || !singles || !news || !promo) {
    notFound();
  }

  return (
    <main>
      <Promo promo={promo.articles} />
      <Separator />
      <CategoryBlock
        articles={concerts.articles}
        name="concerts"
        slug={concerts.slug}
      />
      <Separator />
      <CategoryBlock
        articles={festivals.articles}
        name="festivals"
        slug={festivals.slug}
      />
      <Separator />
      <CategoryBlock articles={news.articles} name="news" slug={news.slug} />
      <Separator />
      <CategoryBlock
        articles={singles.articles}
        name="singles"
        slug={singles.slug}
      />
    </main>
  );
}
