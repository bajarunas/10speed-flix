export interface SeriesAndMoviesListItemResponse {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  vote_average: number;
  vote_count: number;
}

export interface SeriesListItemResponse
  extends SeriesAndMoviesListItemResponse {
  origin_country: string[];
  original_name: string;
  first_air_date: string;
  name: string;
  
}

export interface SeriesListResponse {
  page: number;
  results: SeriesListItemResponse[];
  total_pages: number;
  total_results: number;
}

export interface MovieListItemResponse extends SeriesAndMoviesListItemResponse {
  original_title: string;
  release_date: string;
  title: string;
  video: boolean;

}

export interface MovieListResponse {
  page: number;
  results: MovieListItemResponse[];
  total_pages: number;
  total_results: number;
}

export interface MovieResponse extends MovieListItemResponse {
  budget: number;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string;
  imdb_id: string | null;
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  revenue: number;
  runtime: number;
  spoken_languages: {
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
}
