import { parseImagePath } from "@/api/api.config";
import { MovieListItemResponse, SeriesListItemResponse } from "@/api/api.types";
import { MovieCard } from "@/modules/movies/components/MovieCard";
import { Grid2, Pagination, Stack } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetPopularMovies, useGetPopularSeries } from "../movies.queries";
import { MovieCardLoader } from "./MovieCardLoader";

type MoviesOrSeriesItemResponse =
  | MovieListItemResponse
  | SeriesListItemResponse;

export const MoviesGrid: FC = () => {
  const [search, setSearch] = useSearchParams();
  const [page, setPage] = useState(
    search.get("page") ? +`${search.get("page")}` : 1
  );
  const { data, isFetching } = useGetPopularMovies(page);
  const seriesFetch = useGetPopularSeries(page);

  const [formattedData, setFormattedData] =
    useState<MoviesOrSeriesItemResponse[]>();

  const loader = Array(20)
    .fill(null)
    .map((_, index) => <MovieCardLoader key={index} />);

  const movies = formattedData?.map(
    (item: MovieListItemResponse | SeriesListItemResponse) => {
      let series: SeriesListItemResponse | undefined;
      let movie: MovieListItemResponse | undefined;

      if ("original_name" in item) {
        series = item;
      } else {
        movie = item;
      }

      let title = "Title not Found";

      if (series) {
        title = series.original_name;
      } else if (movie) {
        title = movie.original_title;
      }

      return (
        <MovieCard
          key={item.id}
          movieId={`${item.id}`}
          title={title}
          image={parseImagePath(item.poster_path)}
          movie={movie !== undefined}
        />
      );
    }
  );

  useEffect(() => {
    setFormattedData(undefined);

    const moviesAndSeries: MoviesOrSeriesItemResponse[] = [];

    if (data !== undefined && seriesFetch.data !== undefined) {
      data.results.forEach((movie: MovieListItemResponse) => {
        moviesAndSeries.push(movie);
      });

      seriesFetch.data.results.forEach((series: SeriesListItemResponse) => {
        moviesAndSeries.push(series);
      });
    }

    moviesAndSeries.sort(function sortByPopularity(
      a: { popularity: number },
      b: { popularity: number }
    ) {
      return b.popularity - a.popularity;
    });

    setFormattedData(moviesAndSeries);
  }, [data, seriesFetch.data]);

  useEffect(() => {
    setSearch({ page: `${page}` });
  }, [page, setSearch]);

  return (
    <Stack spacing={5}>
      <Grid2 container columns={{ xs: 12 }} spacing={5}>
        {isFetching ? loader : movies}
      </Grid2>
      <Stack alignItems="center" justifyContent="center">
        <Pagination
          onChange={(_, num) => setPage(num)}
          count={500}
          page={page}
        />
      </Stack>
    </Stack>
  );
};
