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
import { Label, Rating } from "semantic-ui-react";

export function MovieSlug() {
    const [ movieInfo, setMovieInfo ] = useState<MovieResponse>({});
    const configState = useAppSelector(configSelector);
    let { id } = useParams();

    useEffect(() => {
        if (id) {
            // api.movieReviews({ id }).then(res => {
            //     console.log(res)
            // });
            api.movieInfo({ id, language: getUserLanguage() }).then(res => {
                setMovieInfo(res);
                console.log(res)
            });
        }
    }, [id]);

    return (
        <Layout>
            {movieInfo && 
                <div className={styles.banner_container}>
                    <Banner alt={movieInfo.title!} img={movieInfo.backdrop_path!} />
                    <div className={styles.movie_info}>
                        <img src={`${configState?.images.base_url}w400${movieInfo.poster_path}`} className={styles.poster_image} />
                            <div className={styles.title}>
                                <h1> {movieInfo.title} </h1>
                                <div className={styles.genres}>
                                    {movieInfo.genres?.map(genre => (
                                        <Label as='a' color='yellow' image>
                                            { genre.name }
                                            <Label.Detail> &nbsp; </Label.Detail>
                                        </Label>
                                    ))}
                                </div>
                                <div className="votes" style={{ display: 'flex', marginTop: '10px' }}>
                                    <p>Votos: </p>
                                    <Rating maxRating={5} defaultRating={4} icon='star' size='large' />
                                </div>
                            </div>

                            <div className={styles.text_content}>
                                <p>{movieInfo.overview}</p>
                            </div>
                    </div>
                </div>
            }
        </Layout>
    )
}