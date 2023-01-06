import { useEffect, useState } from "react";
import { Layout } from "../../shared/components/Layout/Layout";
import { CarouselComponent } from "./components/Carousel-component";
import { country } from "../../moviedb";
import { MovieResult } from "moviedb-promise";
import { api } from "../../App";
import { getUserLanguage } from "../../shared/utils/tests/functions/user-related";

export function Home(): JSX.Element {
  const [ nowPlayingmovies, setNowPlayingMovies ] = useState<MovieResult[]>([]);
  const [ moviesPopular, setMoviesPopular ] = useState<MovieResult[]>([]);

  const getMoviesPlaying = (): void => {
    api.movieNowPlaying({ language: getUserLanguage(), region: country.Brazil }).then(res => {
      if (res.results) setNowPlayingMovies(res.results);
    });
  }

  const getPopularMovies = () => {
    api.moviePopular({ language: getUserLanguage(), region: country.Brazil }).then(res => {
      if (res.results) setMoviesPopular(res.results);
    });
  }

  useEffect(() => {
    Promise.all([
      getMoviesPlaying(),
      getPopularMovies()
    ]);
  }, []);

    return (
        <Layout>
          <h1>Now playing!</h1>
          <CarouselComponent movies={nowPlayingmovies} />
          <h1>Most Popular</h1>
          <CarouselComponent movies={moviesPopular} />
        </Layout>
    );
}