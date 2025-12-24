export const SearchType = {
  PEOPLE: "people",
  FILMS: "films",
} as const;

export type SearchTypeValue = (typeof SearchType)[keyof typeof SearchType];

export const SEARCH_TYPES = [SearchType.PEOPLE, SearchType.FILMS] as const;
