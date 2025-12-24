import { useQuery } from "@tanstack/react-query";
import PeopleService from "../services/PeopleService";
import type { PersonDetails } from "../services/interfaces/Person";
import type { PersonSearchItem } from "../services/interfaces/Person";

export const usePeopleSearch = (query: string, enabled: boolean) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["people", "search", query],
    queryFn: async () => {
      const result = await PeopleService.search(query);
      if (!result.success || !result.data) {
        throw new Error(result.error || "Failed to search people");
      }
      return result.data;
    },
    enabled: enabled && !!query.trim(),
  });

  return {
    data: data as PersonSearchItem[] | undefined,
    isLoading,
    error: error ? (error as Error).message : undefined,
  };
};

export const usePersonById = (id: string | undefined) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["people", id],
    queryFn: async () => {
      if (!id) throw new Error("Person ID is required");
      const result = await PeopleService.getById(id);
      if (!result.success || !result.data) {
        throw new Error(result.error || "Failed to fetch person");
      }
      return result.data;
    },
    enabled: !!id,
  });

  return {
    data: data as PersonDetails | undefined,
    isLoading,
    error: error ? (error as Error).message : undefined,
  };
};
