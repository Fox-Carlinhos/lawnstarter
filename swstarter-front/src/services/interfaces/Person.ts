export interface Person {
  uid: string;
  name: string;
  url: string;
}

export interface PersonDetails {
  uid: string;
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  url: string;
  created: string;
  edited: string;
  films: string[];
  vehicles: string[];
  starships: string[];
}

export interface PersonResult {
  message: string;
  result: PersonSearchItem;
}

export interface PeopleListResult {
  message: string;
  total_records: number;
  total_pages: number;
  previous: string | null;
  next: string | null;
  results: Person[];
}

export interface PersonSearchProperties {
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
  properties: PersonSearchProperties;
  _id: string;
  description: string;
  uid: string;
  __v: number;
}

export interface PeopleSearchResult {
  message: string;
  result: PersonSearchItem[];
}
