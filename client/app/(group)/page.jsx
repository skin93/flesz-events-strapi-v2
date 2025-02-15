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
