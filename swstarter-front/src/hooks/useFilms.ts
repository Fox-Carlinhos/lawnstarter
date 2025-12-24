import { useQuery } from "@tanstack/react-query";
import FilmsService from "../services/FilmsService";
import type { FilmDetails } from "../services/interfaces/Film";

export const useFilmsSearch = (query: string, enabled: boolean) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["films", "search", query],
    queryFn: async () => {
      const result = await FilmsService.search(query);
      if (!result.success || !result.data) {
        throw new Error(result.error || "Failed to search films");
      }
      return result.data;
    },
    enabled: enabled && !!query.trim(),
  });

  return {
    data: data as FilmDetails[] | undefined,
    isLoading,
    error: error ? (error as Error).message : undefined,
  };
};

export const useFilmById = (id: string | undefined) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["films", id],
    queryFn: async () => {
      if (!id) throw new Error("Film ID is required");
      const result = await FilmsService.getById(id);
      if (!result.success || !result.data) {
        throw new Error(result.error || "Failed to fetch film");
      }
      return result.data;
    },
    enabled: !!id,
  });

  return {
    data: data as FilmDetails | undefined,
    isLoading,
    error: error ? (error as Error).message : undefined,
  };
};
