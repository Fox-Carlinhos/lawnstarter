import { z } from "zod";
import { SearchType, SEARCH_TYPES } from "../constants/searchTypes";

export const SearchInputSchema = z.object({
  q: z.string().min(1, "Query parameter 'q' is required"),
  type: z.enum(SEARCH_TYPES).default(SearchType.PEOPLE),
});

export const ResourceIdSchema = z.object({
  id: z.string().min(1, "Resource ID is required"),
});

export type SearchInput = z.infer<typeof SearchInputSchema>;
export type ResourceIdInput = z.infer<typeof ResourceIdSchema>;
