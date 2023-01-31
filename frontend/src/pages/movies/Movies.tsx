import { MovieResult } from 'moviedb-promise';
import React, { useEffect, useState } from 'react';
import { api } from '../../App';
import { useAppSelector } from '../../app/hooks';
import { configSelector } from '../../features/defaultConfig';
import { country } from '../../moviedb';
import { CardComponent } from '../../shared/components/Card/Card';
import { Layout } from '../../shared/components/Layout/Layout';
import { getUserLanguage } from '../../shared/utils/tests/functions/user-related';
import styles from './Movies.module.scss';

export function Movies() {
    const [ movies, setMovies ] = useState<MovieResult[]>([]);
    const configState = useAppSelector(configSelector);

    const getMovies = () => {
        api.moviePopular({ language: getUserLanguage(), region: country.Brazil }).then(res => {
          if (res.results) setMovies(res.results);
        });
    }

    useEffect(() => {
        getMovies();
    }, []);

    return (
        <Layout>
            <div className={styles.main_container}>
                <div className={styles.filters_container}>

                </div>
                <div className={styles.movies_container}>
                    {movies.map((movie, index) => (
                        <CardComponent key={index} src={`${configState?.images.base_url}w500${movie.poster_path}`} date={''} name={movie.title!} id={movie.id!} />
                    ))}
                </div>
            </div>
        </Layout>
    );
}