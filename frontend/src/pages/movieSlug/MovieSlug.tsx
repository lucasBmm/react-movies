import { useParams } from "react-router-dom";
import { Banner } from "../../shared/components/Banner/Banner";
import { Layout } from "../../shared/components/Layout/Layout";
import { useEffect, useState } from "react";
import { api } from "../../App";
import { MovieResponse, ShowResponse } from "moviedb-promise";
import { getUserLanguage } from "../../shared/utils/tests/functions/user-related";
import styles from './MovieSlug.module.scss';
import { useAppSelector } from "../../app/hooks";
import { configSelector } from "../../features/defaultConfig";
import { Dimmer, Label, Loader, Rating, Statistic } from "semantic-ui-react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';

export function MovieSlug() {
    // const [ movieInfo, setMovieInfo ] = useState<MovieResponse>({});
    const [ movieInfo, setMovieInfo ] = useState<ShowResponse>({});
    const configState = useAppSelector(configSelector);
    let { id } = useParams();

    useEffect(() => {
        if (id) {
            api.movieReviews({ id }).then(res => {
            });
            api.tvInfo({ id, language: getUserLanguage() }).then(res => {
                setMovieInfo(res)
            });
            api.tvPopular().then(res => console.log(res))
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
                                <Banner alt={movieInfo.name!} img={movieInfo.backdrop_path!} filter />
                                <div className={styles.movie_info}>

                                    <img src={`${configState?.images.base_url}w400${movieInfo.poster_path}`} className={styles.movie_poster} />

                                    <div className={styles.movie_ratings}>

                                        <div className={styles.vote_average}>
                                            <small> Votação popular </small>
                                            <CircularProgressbar 
                                                value={movieInfo.vote_average! * 10} 
                                                text={`${(movieInfo.vote_average! * 10).toFixed(0)}%`} 
                                                styles={buildStyles({
                                                    trailColor: 'transparent',
                                                    pathColor: "#537542",
                                                    textColor: 'white',
                                                    textSize: '2rem'
                                                })}
                                            />
                                        </div>

                                        <div className={styles.vote_count}>
                                            <p>{ movieInfo.vote_count }</p>
                                            <label className={styles.vote_label}> Votos </label>
                                        </div>

                                    </div>

                                    <div className={styles.movie_title}>
                                        <h1> { movieInfo.name } </h1>
                                    </div>

                                    <div className={styles.movie_description}>

                                    </div>

                                    <div className={styles.movie_genres}>

                                    </div>

                                    <div className={styles.movie_actors}>

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