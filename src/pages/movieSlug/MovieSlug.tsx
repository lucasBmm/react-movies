import { Link, useParams } from "react-router-dom";
import { Layout } from "../../shared/components/Layout/Layout";
import { useEffect, useState } from "react";
import { api, responsive } from "../../App";
import { Cast, Video, ShowResponse, MovieResult, MovieResponse } from "moviedb-promise";
import { getUserLanguage } from "../../shared/utils/tests/functions/user-related";
import styles from './MovieSlug.module.scss';
import { useAppSelector } from "../../app/hooks";
import { configSelector } from "../../features/defaultConfig";
import { Button, Dimmer, Icon, Loader } from "semantic-ui-react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import { Actor } from "./components/Actor";
import { VideoSelector } from "./components/VideoSelector";
import { CardComponent } from "../../shared/components/Card/Card";
import Carousel from "react-multi-carousel";

export function MovieSlug() {
    // const [ movieInfo, setMovieInfo ] = useState<MovieResponse>({});
    const [ movieInfo, setMovieInfo ] = useState<MovieResponse>({});
    const [ similar, setSimilar ] = useState<MovieResult[]>([]);
    const [ videos, setVideos ] = useState<Video[]>([]);
    const [ cast, setCast ] = useState<Cast[]>([]);
    const configState = useAppSelector(configSelector);
    let { id } = useParams();

    useEffect(() => {
        setMovieInfo({});
        setSimilar([]);
        setVideos([]);
        setCast([]);
        
        if (id) {
            api.movieReviews({ id }).then(res => { console.log(res) });

            api.movieInfo({ id, language: getUserLanguage() }).then(res => {
                setMovieInfo(res)
            });

            api.movieCredits({id, language: getUserLanguage()}).then(res => { if (res.cast)    setCast(res.cast.slice(0, 5))});
            api.movieVideos({id, language: getUserLanguage()}).then(res =>  { if (res.results) setVideos(res.results)});
            api.movieSimilar({id, language: getUserLanguage()}).then(res => { if (res.results) setSimilar(res.results)})
        }
    }, [id]);

    return (
        <Layout>
            <div className={styles.details_container}>
                {!movieInfo.id ? (
                    <div className={styles.movie_info}>
                        <Dimmer active page>
                            <Loader />
                        </Dimmer>
                    </div>
                    ) : 
                    (
                        <>
                            <div className={styles.top_content} 
                                style={{backgroundImage: `linear-gradient(to top, rgba(16,19,24,255), rgba(0,0,0,0)), url(${configState?.images.base_url}original${movieInfo.backdrop_path})`}}>
                                <div className={styles.movie_info}>
                                    <div className={styles.movie_poster}>
                                        <img src={`${configState?.images.base_url}w400${movieInfo.poster_path}`} />
                                    </div>

                                    <div className={styles.movie_ratings}>

                                        <div className={styles.vote_average}>
                                            <small> Aprovação </small>
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
                                            <small> Crítica </small>
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

                                        <div className={styles.vote_test}>
                                            <small> Audiência </small>
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

                                    </div>

                                    <div className={styles.movie_title}>
                                        <h1> { movieInfo.title } </h1>
                                        
                                        <div className={styles.serie_information}>
                                            {/* <div className="year">
                                                <p>Ano: {movieInfo.first_air_date?.substring(0, 4)}</p>
                                            </div> */}

                                            <div className="year">
                                                <p>Ano: {movieInfo.release_date?.substring(0, 4)}</p>
                                            </div>

                                            {/* <div className="seasons">
                                                <p> {movieInfo.number_of_seasons} Temporada</p>
                                            </div> */}

                                            {/* <div className="episodes">
                                                <p> {movieInfo.number_of_episodes} Episódios</p>
                                            </div> */}
                                        </div>

                                        <div className={styles.buttons_container}>

                                            {/* <button className={styles.watch_button}>Assista Agora</button> */}
                                            <Button className={styles.watch_button} animated>
                                                <Button.Content visible>Assista Agora</Button.Content>
                                                <Button.Content hidden>
                                                    <Icon name='arrow right' />
                                                </Button.Content>
                                            </Button>

                                            <div className={styles.social_buttons}>
                                                <button className={styles.rounded_button}> <Icon name="bookmark outline"/> </button>
                                                <button className={styles.rounded_button}> <Icon name="share alternate"/>  </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={styles.movie_description}>
                                        {movieInfo.overview}
                                    </div>

                                    <div className={styles.movie_details}>
                                        <div className={styles.movie_genres}>
                                            <p>Gêneros: </p>
                                            { movieInfo.genres && movieInfo.genres.map(genre => (
                                                <p>{genre.name}</p>
                                            ))}
                                        </div>

                                        
                                    </div>

                                    <div className={styles.movie_actors}>
                                        <h3> Elenco </h3>
                                        {cast.map(actor => (
                                            <Actor 
                                                base_url={configState?.images.base_url!} 
                                                profile_path={actor.profile_path!} 
                                                actor_name={actor.name} 
                                                character_name={actor.character} 
                                            />
                                        ))}
                                        {cast.length >= 5 && (
                                            <div className={styles.cast_see_more}>
                                                <Link to={'people'}>Ver mais <Icon name="arrow alternate circle right outline"/></Link>
                                            </div>
                                        )}
                                    </div>
                                    
                                </div>
                            </div>

                            <div className={styles.video_container}>
                                <h3> Videos </h3>
                                {videos.length > 1 && <VideoSelector videos={videos} />}
                            </div>

                            <div className={styles.recomended_content}>
                                <h1>Similar content</h1>
                                {similar && 
                                (
                                    <Carousel  
                                    deviceType={"desktop"}
                                    itemClass="image-item"
                                    responsive={responsive}
                                    centerMode
                                    >
                                    {similar?.map(movie => (
                                        movie.backdrop_path && <CardComponent name={`${movie.title}`} src={`${configState?.images.base_url}w500${movie.backdrop_path}`} id={movie.id!} key={movie.id} />
                                    ))}
                                    </Carousel>
                                )}
                            </div>
                        </>
                    )
                }
            </div>
        </Layout>
    )
}