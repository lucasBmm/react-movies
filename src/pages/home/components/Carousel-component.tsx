import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import { CardComponent } from '../../../shared/components/Card/Card';
import "semantic-ui-css/semantic.min.css";
import "react-multi-carousel/lib/styles.css";
import { MovieDb, country } from '../../../moviedb/index';
import { MovieResult } from 'moviedb-promise';

export function CarouselComponent() {
  const api = new MovieDb('eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZjc4NWY3MmU3NzA3N2Q1NjY0Mzc4ZTI1MmQ0YjM5NiIsInN1YiI6IjYzYTYzOTM3MWY3NDhiMDBhN2M2MmY5YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iL_cVV6Vo3VzNlDwwwXzwxiUY67H27juKoFZJjCJPUQ');
  let moviesList: MovieResult[] = []; 
  const [ movies, setMovies ] = useState<MovieResult[]>([]);
  const [ baseUrl, setBaseUrl ] = useState('');

  useEffect(() => {

    Promise.all([
      api.movieNowPlaying({ language: 'pt-BR', region: country.Brazil}).then(res => {
        moviesList = [...res.results!];
        setMovies(res.results!);
        console.log(moviesList[0].poster_path)
      }),
      api.configuration().then(res => {
        setBaseUrl(res.images.base_url!);
      })
    ]);
    
  }, []);

  useEffect(() => {
    console.log(movies[0]?.poster_path)
    console.log(baseUrl?.slice(0,-1))
  }, [baseUrl, movies])

  const responsive = {
      superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5
      },
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 3
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 2
      }
  };

  return (
    <Carousel
      deviceType={"desktop"}
      itemClass="image-item"
      responsive={responsive}
      centerMode
    >
      {movies.map(movie => {
        return (
          <>
            <CardComponent src={`${baseUrl}w500${movie.poster_path}`} date={movie.release_date!} name={movie.title!} id={movie.id!} />
          </>
        );
      })}
    </Carousel>
  );
}