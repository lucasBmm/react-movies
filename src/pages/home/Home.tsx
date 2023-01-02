import { useEffect, useState } from "react";
import { Layout } from "../../shared/components/Layout/Layout";
import { CarouselComponent } from "./components/Carousel-component";
import { country } from "../../moviedb";
import { MovieResult } from "moviedb-promise";
import { api } from "../../App";

export function Home(): JSX.Element {
  const [ movies, setMovies ] = useState<MovieResult[]>([]);

  useEffect(() => {
    api.movieNowPlaying({ language: 'pt-BR', region: country.Brazil }).then(res => {
      if (res.results) setMovies(res.results);
    });
  }, []);

    return (
        <Layout>
          <h1>Now playing!</h1>
          <CarouselComponent movies={movies} />
        </Layout>
    );
}