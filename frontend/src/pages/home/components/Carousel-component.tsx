import React from 'react';
import Carousel from 'react-multi-carousel';
import { CardComponent } from '../../../shared/components/Card/Card';
import "semantic-ui-css/semantic.min.css";
import "react-multi-carousel/lib/styles.css";
import { useAppSelector } from '../../../app/hooks';
import { configSelector } from '../../../features/defaultConfig';
import { MovieResult } from 'moviedb-promise';

interface Props {
  movies: MovieResult[],
  date?: boolean
}

export function CarouselComponent({ movies, date }: Props) {
  const configState = useAppSelector(configSelector);

  const responsive = {
      superLargeDesktop: {
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
            <CardComponent key={movie.id} src={`${configState?.images.base_url}w500${movie.poster_path}`} date={date ? movie.release_date! : ''} name={movie.title!} id={movie.id!} />
          </>
        );
      })}
    </Carousel>
  );
}