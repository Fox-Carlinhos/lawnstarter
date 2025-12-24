import httpClient from "./httpClient";
import type { PersonDetails, PersonSearchItem } from "./interfaces/Person";
import type { ServiceResult } from "./interfaces/ServiceResult";
import { ApiSearchType } from "../constants/resourceTypes";

interface PersonSearchResult {
  uid: string;
  name: string;
}

interface PersonDetailResult {
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

interface BFFSearchResponse {
  success: boolean;
  data?: PersonSearchResult[];
  meta?: { count: number; durationMs: number };
  error?: string;
}

interface BFFPersonResponse {
  success: boolean;
  data?: PersonDetailResult;
  meta?: { durationMs: number };
  error?: string;
}

function toPersonSearchItem(person: PersonSearchResult): PersonSearchItem {
  return {
    uid: person.uid,
    _id: person.uid,
    description: "A person within the Star Wars universe",
    __v: 0,
    properties: {
      name: person.name,
      height: "",
      mass: "",
      hair_color: "",
      skin_color: "",
      eye_color: "",
      birth_year: "",
      gender: "",
      homeworld: "",
      films: [],
      vehicles: [],
      starships: [],
      url: "",
      created: "",
      edited: "",
    },
  };
}

function toPersonDetails(person: PersonDetailResult): PersonDetails {
  return {
    uid: person.uid,
    name: person.name,
    height: person.height,
    mass: person.mass,
    hair_color: person.hairColor,
    skin_color: person.skinColor,
    eye_color: person.eyeColor,
    birth_year: person.birthYear,
    gender: person.gender,
    homeworld: "",
    url: "",
    created: "",
    edited: "",
    films: person.films || [],
    vehicles: [],
    starships: [],
  };
}

class PeopleService {
  async search(query: string): Promise<ServiceResult<PersonSearchItem[]>> {
    try {
      const response = await httpClient.get<BFFSearchResponse>("/search", {
        params: {
          q: query,
          type: ApiSearchType.PEOPLE,
        },
      });

      if (!response.data?.success) {
        return {
          success: false,
          error: response.data?.error || "Search failed",
        };
      }

      const people = (response.data?.data || []).map(toPersonSearchItem);

      if (!people.length) {
        return {
          success: false,
          error: "No people found matching your search.",
        };
      }

      return {
        success: true,
        data: people,
      };
    } catch (error: unknown) {
      const err = error as {
        response?: {
          data?: { error?: string; message?: string };
          status?: number;
        };
        message?: string;
      };
      const errorMessage =
        err.response?.data?.error ||
        err.response?.data?.message ||
        err.message ||
        "Error searching for people.";

      return {
        success: false,
        error: errorMessage,
        status: err.response?.status,
      };
    }
  }

  async getById(id: string): Promise<ServiceResult<PersonDetails>> {
    try {
      const response = await httpClient.get<BFFPersonResponse>(`/people/${id}`);

      if (!response.data?.success || !response.data?.data) {
        return {
          success: false,
          error: response.data?.error || "Failed to get person",
          status: 404,
        };
      }

      return {
        success: true,
        data: toPersonDetails(response.data.data),
      };
    } catch (error: unknown) {
      const err = error as {
        response?: {
          data?: { error?: string; message?: string };
          status?: number;
        };
        message?: string;
      };
      const errorMessage =
        err.response?.data?.error ||
        err.response?.data?.message ||
        err.message ||
        "Error fetching person details.";

      return {
        success: false,
        error: errorMessage,
        status: err.response?.status,
      };
    }
  }
}

export default new PeopleService();
