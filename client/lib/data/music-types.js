import { grafbase } from "../graphql";
import { ALL_MUSIC_TYPES_QUERY } from "../queries/music-types/allMusicTypesQuery";

export async function getAllMusicTypes() {
  const res = await grafbase.request(ALL_MUSIC_TYPES_QUERY);
  return {
    genres: res.musicTypes.map((genre) => genre.name),
  };
}
