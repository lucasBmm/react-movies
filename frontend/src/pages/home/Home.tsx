import { useEffect, useState } from "react";
import { Layout } from "../../shared/components/Layout/Layout";
import { CarouselComponent } from "./components/Carousel-component";
import { country } from "../../moviedb";
import { MovieResult } from "moviedb-promise";
import { api } from "../../App";
import { getUserLanguage } from "../../shared/utils/tests/functions/user-related";
import { Banner } from "../../shared/components/Banner/Banner";
import styles from './Home.module.scss';
import { Link } from "react-router-dom";

export function Home(): JSX.Element {
  const [ nowPlayingmovies, setNowPlayingMovies ] = useState<MovieResult[]>([]);
  const [ moviesPopular, setMoviesPopular ] = useState<MovieResult[]>([]);
  const [ upcomingMovies, setUpcomingMovies ] = useState<MovieResult[]>([]);

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

  const getUpcomingMovies = () => {
    api.upcomingMovies({ language: getUserLanguage(), region: country.Brazil }).then(res => {
      if (res.results) setUpcomingMovies(res.results);
    });
  }

  useEffect(() => {
    Promise.all([
      getMoviesPlaying(),
      getPopularMovies(),
      getUpcomingMovies()
    ]);
  }, []);

    return (
        <Layout>
          <div className={styles.banner_container}>
            <Link to={'/movies/' + moviesPopular[0]?.id}>
              <Banner alt={moviesPopular[0]?.title!} img={moviesPopular[0]?.backdrop_path!} />
              <div className={styles.content}>
                <h1>{moviesPopular[0]?.title}</h1>
              </div>
            </Link>
          </div>
          <h1>Now playing!</h1>
          <CarouselComponent movies={nowPlayingmovies} />
          <h1>Most Popular</h1>
          <CarouselComponent movies={moviesPopular} />
          <h1>Upcoming</h1>
          <CarouselComponent movies={upcomingMovies} date/>
        </Layout>
    );
}