import { queryClient } from "./queryClient";
import { api } from "./api";

export async function handlePerfetchAnime(id: number) {
  await queryClient.prefetchQuery(
    ["anime-page", id],
    async () => {
      const { data } = await api.get(`/anime/id/${id}`);
      console.log(data);
      return data;
    },
    {
      staleTime: 1000 * 60,
    }
  );
}
