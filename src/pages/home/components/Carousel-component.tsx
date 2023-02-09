import React from 'react';
import Carousel from 'react-multi-carousel';
import { CardComponent } from '../../../shared/components/Card/Card';
import "semantic-ui-css/semantic.min.css";
import "react-multi-carousel/lib/styles.css";
import { useAppSelector } from '../../../app/hooks';
import { configSelector } from '../../../features/defaultConfig';
import { MovieResult } from 'moviedb-promise';
import { responsive } from '../../../App';

interface Props {
  movies: MovieResult[],
  date?: boolean
}

export function CarouselComponent({ movies, date }: Props) {
  const configState = useAppSelector(configSelector);

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
            {movie.poster_path &&  <CardComponent key={movie.id} src={`${configState?.images.base_url}w500${movie.poster_path}`} date={date ? movie.release_date! : ''} name={movie.title!} id={movie.id!} /> }
          </>
        );
      })}
    </Carousel>
  );
}