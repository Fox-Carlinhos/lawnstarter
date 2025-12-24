export interface Film {
  uid: string;
  name: string;
  url: string;
}

export interface FilmDetails {
  uid: string;
  properties: {
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
  };
  description: string;
  _id: string;
  __v: number;
}

export interface FilmResult {
  message: string;
  result: FilmDetails;
}

export interface FilmsListResult {
  message: string;
  total_records: number;
  total_pages: number;
  previous: string | null;
  next: string | null;
  results: Film[];
}

export interface FilmsSearchResult {
  message: string;
  result: FilmDetails[];
}
