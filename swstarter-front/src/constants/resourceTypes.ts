export const ResourceType = {
  PEOPLE: "people",
  MOVIES: "movies",
} as const;

export type ResourceTypeValue =
  (typeof ResourceType)[keyof typeof ResourceType];

export const ApiSearchType = {
  PEOPLE: "people",
  FILMS: "films",
} as const;

export type ApiSearchTypeValue =
  (typeof ApiSearchType)[keyof typeof ApiSearchType];
