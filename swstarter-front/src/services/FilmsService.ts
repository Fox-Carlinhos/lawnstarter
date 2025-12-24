import httpClient from "./httpClient";
import type { FilmDetails } from "./interfaces/Film";
import type { ServiceResult } from "./interfaces/ServiceResult";
import { ApiSearchType } from "../constants/resourceTypes";

interface FilmSearchResult {
  uid: string;
  title: string;
}

interface FilmDetailResult {
  uid: string;
  title: string;
  episodeId: number;
  openingCrawl: string;
  director: string;
  producer: string;
  releaseDate: string;
  characters: string[];
}

interface BFFFilmSearchResponse {
  success: boolean;
  data?: FilmSearchResult[];
  meta?: { count: number; durationMs: number };
  error?: string;
}

interface BFFFilmResponse {
  success: boolean;
  data?: FilmDetailResult;
  meta?: { durationMs: number };
  error?: string;
}

function toFilmSearchItem(film: FilmSearchResult): FilmDetails {
  return {
    uid: film.uid,
    _id: film.uid,
    description: "A Star Wars film",
    __v: 0,
    properties: {
      title: film.title,
      episode_id: 0,
      opening_crawl: "",
      director: "",
      producer: "",
      release_date: "",
      characters: [],
      planets: [],
      starships: [],
      vehicles: [],
      species: [],
      url: "",
      created: "",
      edited: "",
    },
  };
}

function toFilmDetails(film: FilmDetailResult): FilmDetails {
  return {
    uid: film.uid,
    _id: film.uid,
    description: "A Star Wars film",
    __v: 0,
    properties: {
      title: film.title,
      episode_id: film.episodeId,
      opening_crawl: film.openingCrawl || "",
      director: film.director,
      producer: film.producer,
      release_date: film.releaseDate,
      characters: film.characters || [],
      planets: [],
      starships: [],
      vehicles: [],
      species: [],
      url: "",
      created: "",
      edited: "",
    },
  };
}

class FilmsService {
  async search(query: string): Promise<ServiceResult<FilmDetails[]>> {
    try {
      const response = await httpClient.get<BFFFilmSearchResponse>("/search", {
        params: {
          q: query,
          type: ApiSearchType.FILMS,
        },
      });

      if (!response.data?.success) {
        return {
          success: false,
          error: response.data?.error || "Search failed",
        };
      }

      const films = (response.data?.data || []).map(toFilmSearchItem);

      if (!films.length) {
        return {
          success: false,
          error: "No films found matching your search.",
        };
      }

      return {
        success: true,
        data: films,
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
        "Error searching for films.";

      return {
        success: false,
        error: errorMessage,
        status: err.response?.status,
      };
    }
  }

  async getById(id: string): Promise<ServiceResult<FilmDetails>> {
    try {
      const response = await httpClient.get<BFFFilmResponse>(`/films/${id}`);

      if (!response.data?.success || !response.data?.data) {
        return {
          success: false,
          error: response.data?.error || "Failed to get film",
          status: 404,
        };
      }

      return {
        success: true,
        data: toFilmDetails(response.data.data),
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
        "Error fetching film details.";

      return {
        success: false,
        error: errorMessage,
        status: err.response?.status,
      };
    }
  }
}

export default new FilmsService();
