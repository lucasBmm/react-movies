import { useParams } from "react-router-dom";
import { Banner } from "../../shared/components/Banner/Banner";
import { Layout } from "../../shared/components/Layout/Layout";
import { useEffect, useState } from "react";
import { api } from "../../App";
import { MovieResponse } from "moviedb-promise";
import { getUserLanguage } from "../../shared/utils/tests/functions/user-related";

export function MovieSlug() {
    const [ movieInfo, setMovieInfo ] = useState<MovieResponse>({});
    let { id } = useParams();

    useEffect(() => {
        if (id) {
            api.movieReviews({ id }).then(res => {
                console.log(res)
            });
            api.movieInfo({ id, language: getUserLanguage() }).then(res => {
                setMovieInfo(res);
                console.log(res)
            });
        }
    }, [id]);

    return (
        <Layout>
            {movieInfo && 
                <>
                    <Banner alt={movieInfo.title!} img={movieInfo.backdrop_path!} />
                    <div style={{ zIndex: '10', position: 'absolute' }}>
                        <p>Testando essa joça</p>
                    </div>
                </>
            }
        </Layout>
    )
}