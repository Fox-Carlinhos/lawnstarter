export interface PersonProperties {
  created: string;
  edited: string;
  name: string;
  gender: string;
  skin_color: string;
  hair_color: string;
  height: string;
  eye_color: string;
  mass: string;
  homeworld: string;
  birth_year: string;
  vehicles: string[];
  starships: string[];
  films: string[];
  url: string;
}

export interface PersonSearchItem {
  properties: PersonProperties;
  _id: string;
  description: string;
  uid: string;
  __v: number;
}

export interface FilmProperties {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  created: string;
  edited: string;
  url: string;
}

export interface FilmSearchItem {
  uid: string;
  properties: FilmProperties;
  description: string;
  _id: string;
  __v: number;
}

export interface SwapiSearchResponse<T> {
  message: string;
  result: T[];
}

export interface SwapiDetailResponse<T> {
  message: string;
  result: T;
}

export interface PersonSearchResult {
  uid: string;
  name: string;
}

export interface PersonDetail {
  uid: string;
  name: string;
  height: string;
  mass: string;
  hairColor: string;
  skinColor: string;
  eyeColor: string;
  birthYear: string;
  gender: string;
  films: string[];
}

export interface FilmSearchResult {
  uid: string;
  title: string;
}

export interface FilmDetail {
  uid: string;
  title: string;
  episodeId: number;
  openingCrawl: string;
  director: string;
  producer: string;
  releaseDate: string;
  characters: string[];
}

export interface SearchResult<T> {
  data: T[];
  count: number;
  durationMs: number;
}

export interface DetailResult<T> {
  data: T;
  durationMs: number;
}
