import { AxiosError } from "axios";
import { swApiHttpClient } from "./swApiHttpClient";
import type {
  PersonSearchItem,
  FilmSearchItem,
  SwapiSearchResponse,
  SwapiDetailResponse,
  PersonSearchResult,
  PersonDetail,
  FilmSearchResult,
  FilmDetail,
  SearchResult,
  DetailResult,
} from "./types";

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }
}

class SwApiService {
  async searchPeople(query: string): Promise<SearchResult<PersonSearchResult>> {
    const start = Date.now();

    const response = await swApiHttpClient.get<
      SwapiSearchResponse<PersonSearchItem>
    >("/people", {
      params: { name: query },
    });

    const durationMs = Date.now() - start;
    const results = response.data.result || [];

    return {
      data: results.map((item) => ({
        uid: item.uid,
        name: item.properties.name,
      })),
      count: results.length,
      durationMs,
    };
  }

  async getPersonById(id: string): Promise<DetailResult<PersonDetail>> {
    const start = Date.now();

    try {
      const response = await swApiHttpClient.get<
        SwapiDetailResponse<PersonSearchItem>
      >(`/people/${id}`);

      const durationMs = Date.now() - start;
      const item = response.data.result;
      const props = item.properties;

      return {
        data: {
          uid: item.uid,
          name: props.name,
          height: props.height,
          mass: props.mass,
          hairColor: props.hair_color,
          skinColor: props.skin_color,
          eyeColor: props.eye_color,
          birthYear: props.birth_year,
          gender: props.gender,
          films: props.films,
        },
        durationMs,
      };
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 404) {
        throw new NotFoundError(`Person with ID ${id} not found`);
      }
      throw error;
    }
  }

  async searchFilms(query: string): Promise<SearchResult<FilmSearchResult>> {
    const start = Date.now();

    const response = await swApiHttpClient.get<
      SwapiSearchResponse<FilmSearchItem>
    >("/films", {
      params: { title: query },
    });

    const durationMs = Date.now() - start;
    const results = response.data.result || [];

    return {
      data: results.map((item) => ({
        uid: item.uid,
        title: item.properties.title,
      })),
      count: results.length,
      durationMs,
    };
  }

  async getFilmById(id: string): Promise<DetailResult<FilmDetail>> {
    const start = Date.now();

    try {
      const response = await swApiHttpClient.get<
        SwapiDetailResponse<FilmSearchItem>
      >(`/films/${id}`);

      const durationMs = Date.now() - start;
      const item = response.data.result;
      const props = item.properties;

      return {
        data: {
          uid: item.uid,
          title: props.title,
          episodeId: props.episode_id,
          openingCrawl: props.opening_crawl,
          director: props.director,
          producer: props.producer,
          releaseDate: props.release_date,
          characters: props.characters,
        },
        durationMs,
      };
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 404) {
        throw new NotFoundError(`Film with ID ${id} not found`);
      }
      throw error;
    }
  }
}

export const swApiService = new SwApiService();
