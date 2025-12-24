import { useQueries } from "@tanstack/react-query";
import PeopleService from "../services/PeopleService";
import type { PersonDetails } from "../services/interfaces/Person";

export const useMultiplePeople = (ids: string[]) => {
  const queries = useQueries({
    queries: ids.map((id) => ({
      queryKey: ["people", id],
      queryFn: async () => {
        const result = await PeopleService.getById(id);
        if (!result.success || !result.data) {
          throw new Error(result.error || "Failed to fetch person");
        }
        return result.data;
      },
      enabled: !!id,
    })),
  });

  return {
    data: queries
      .map((q) => q.data)
      .filter((person): person is PersonDetails => !!person),
    isLoading: queries.some((q) => q.isLoading),
    errors: queries.map((q) => q.error).filter(Boolean),
  };
};
