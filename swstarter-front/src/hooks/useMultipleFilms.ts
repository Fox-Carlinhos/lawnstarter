import { useQueries } from "@tanstack/react-query";
import FilmsService from "../services/FilmsService";
import type { FilmDetails } from "../services/interfaces/Film";

export const useMultipleFilms = (ids: string[]) => {
  const queries = useQueries({
    queries: ids.map((id) => ({
      queryKey: ["films", id],
      queryFn: async () => {
        const result = await FilmsService.getById(id);
        if (!result.success || !result.data) {
          throw new Error(result.error || "Failed to fetch film");
        }
        return result.data;
      },
      enabled: !!id,
    })),
  });

  return {
    data: queries
      .map((q) => q.data)
      .filter((film): film is FilmDetails => !!film),
    isLoading: queries.some((q) => q.isLoading),
    errors: queries.map((q) => q.error).filter(Boolean),
  };
};
