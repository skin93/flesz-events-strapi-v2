import { connection } from "next/server";
import { Separator } from "@/components/ui/separator";
import { notFound } from "next/navigation";
import { fetchWithArgs } from "@/lib/fetcher";
import { LATEST_ARTICLES_QUERY } from "@/lib/queries/articles/latestArticlesQuery";
import News from "@/components/homepage/news";
import Singles from "@/components/homepage/singles";
import Concerts from "@/components/homepage/concerts";
import Festivals from "@/components/homepage/festivals";
import Promo from "@/components/homepage/promo";

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
      <News news={news[0].articles} />
      <Separator />
      <Singles singles={singles[0].articles} />
      <Separator />
      <Concerts concerts={concerts[0].articles} />
      <Separator />
      <Festivals festivals={festivals[0].articles} />
    </main>
  );
}
