import { MovieResult, PopularMoviesResponse } from 'moviedb-promise';
import React, { useEffect, useState } from 'react';
import { DropdownItemProps, Input, Pagination, Select } from 'semantic-ui-react';
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
    const [ pages, setPages ] = useState<PopularMoviesResponse>();
    const [ selected, setSelected ] = useState<string>('popularidade');
    const configState = useAppSelector(configSelector);

    const options: DropdownItemProps[] = [
        { key: 'popularidade', text: 'Popularidade', value: 'popularidade' },
        { key: 'avaliados', text: 'Melhor avaliados', value: 'avaliados' },
        { key: 'reviews', text: 'Com mais Reviews', value: 'reviews' },
    ];

    const getMovies = (page: number) => {
        setMovies([]);

        switch (selected) {
            case 'popularidade': {
                api.moviePopular({ language: getUserLanguage(), region: country.Brazil, page }).then(res => {
                  if (res.results) setMovies(res.results);
                  setPages({...res, results: []});
                });
                break;
            }

            case 'avaliados': {
                api.movieTopRated({ language: getUserLanguage(), region: country.Brazil, page }).then(res => {
                    if (res.results) setMovies(res.results);
                    setPages({...res, results: []});
                });
                break;
            }

            default: {
                alert("Erro")
            }
        }

    }

    useEffect(() => {
        getMovies(1);
    }, []);

    useEffect(() => {
        getMovies(1);
    }, [selected]);

    return (
        <Layout>
            <div className={styles.main_container}>
                <div className={styles.filters_container}>
                    <label htmlFor=""></label>
                    <Input className='' icon='search' placeholder='Search...' />
                    <Select options={options} defaultValue='popularidade' onChange={(e, d) => setSelected(d.value as string)} />
                </div>
                <div className={styles.movies_container}>
                    <div className={styles.movies_list}>
                        {movies.map((movie, index) => (
                            <CardComponent key={index} src={`${configState?.images.base_url}w500${movie.poster_path}`} date={''} name={movie.title!} id={movie.id!} />
                        ))}
                    </div>
                    <div className={styles.pagination_container}>
                        {pages && 
                            <Pagination 
                                defaultActivePage={1} 
                                totalPages={`${pages?.total_pages! > 500 ? 500 : pages?.total_pages}`} 
                                onPageChange={e => getMovies(Number(e.currentTarget?.innerText)) }
                        />}
                    </div>
                </div>
            </div>
        </Layout>
    );
}