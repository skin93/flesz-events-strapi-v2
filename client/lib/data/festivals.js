import { grafbase } from "../graphql";
import { ALL_FESTIVALS_QUERY } from "../queries/festivals/allFestivalsQuery";

export async function getAllFestivals() {
  const res = await grafbase.request(ALL_FESTIVALS_QUERY);
  return {
    festivals: res.festivals,
  };
}
