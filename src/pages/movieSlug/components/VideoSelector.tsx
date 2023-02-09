import { Video } from 'moviedb-promise';
import React, { useEffect, useState } from 'react';
import { TrailerVideo } from './TrailerVideo';
import styles from './VideoSelector.module.scss';

interface Props {
    videos: Video[]
}

export function VideoSelector({ videos }: Props) {
    const [ selectedVideo, setSelectedVideo ] = useState(videos[0])
    const [ otherVideos, setOtherVideos ] = useState<Video[]>(videos.slice(1));

    console.log(videos)

    useEffect(() => {
        setOtherVideos([...videos.filter(video => video.id !== selectedVideo.id)]);
    }, [selectedVideo]);

    return (
        <div className={styles.videos_container}>

            <div className={styles.selected_video_container}>
                <TrailerVideo videoId={selectedVideo?.key} />
            </div>

            <div className={styles.other_videos_container}>

                {otherVideos.map(video => (
                    <div className={styles.video_option_container}>
                        <div className={styles.video_option} onClick={() => setSelectedVideo(video)} ></div>
                        <TrailerVideo videoId={video.key} />
                    </div>
                ))}
                
            </div>

        </div>
    )
}