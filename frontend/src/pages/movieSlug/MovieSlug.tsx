import { useParams } from "react-router-dom";
import { Banner } from "../../shared/components/Banner/Banner";
import { Layout } from "../../shared/components/Layout/Layout";
import { useEffect, useState } from "react";
import { api } from "../../App";
import { MovieResponse } from "moviedb-promise";
import { getUserLanguage } from "../../shared/utils/tests/functions/user-related";
import styles from './MovieSlug.module.scss';
import { useAppSelector } from "../../app/hooks";
import { configSelector } from "../../features/defaultConfig";
import { Dimmer, Label, Loader, Rating, Statistic } from "semantic-ui-react";

export function MovieSlug() {
    const [ movieInfo, setMovieInfo ] = useState<MovieResponse>({});
    const configState = useAppSelector(configSelector);
    let { id } = useParams();

    useEffect(() => {
        if (id) {
            api.movieReviews({ id }).then(res => {
            });
            api.movieInfo({ id, language: getUserLanguage() }).then(res => {
                setMovieInfo(res)
            });
        }
    }, [id]);

    return (
        <Layout>
            {movieInfo && 
                <div className={styles.banner_container}>
                    {!movieInfo.id ? (
                        <div className={styles.movie_info}>
                            <Dimmer active page>
                                <Loader />
                            </Dimmer>
                        </div>
                        ) : 
                        (
                            <>
                                <Banner alt={movieInfo.title!} img={movieInfo.backdrop_path!} filter />
                                <div className={styles.movie_info}>
                                    <img src={`${configState?.images.base_url}w400${movieInfo.poster_path}`} className={styles.poster_image} />
                                    <div className={styles.title}>
                                        <h1> {movieInfo.title} </h1>
                                        <div className={styles.genres}>
                                            <Label.Group color='yellow' tag>
                                                {movieInfo.genres?.map(genre => (
                                                    <Label as='a' key={genre.id}>
                                                        { genre.name }
                                                    </Label>
                                                ))}
                                            </Label.Group>
                                        </div>
                                        <div className={styles.vote}>
                                            <div className={styles.vote_count}>
                                                <p>{ movieInfo.vote_average?.toFixed(1) }</p>
                                                <label className={styles.vote_label}> Avaliação </label>
                                            </div>
                                            
                                            <div className={styles.vote_count}>
                                                <p>{ movieInfo.vote_count }</p>
                                                <label className={styles.vote_label}> Votos </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={styles.text_content}>
                                        <h3> Sinopse </h3>
                                        <p>{movieInfo.overview}</p>
                                    </div>
                                </div>
                            </>
                        )
                    }
                </div>
            }
        </Layout>
    )
}