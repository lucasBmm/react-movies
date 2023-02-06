import { Video } from 'moviedb-promise';
import React, { useEffect, useState } from 'react';
import { TrailerVideo } from './TrailerVideo';
import styles from './VideoSelector.module.scss';

interface Props {
    videos: Video[] | undefined
}

export function VideoSelector({ videos }: Props) {

    if (!videos) {
        return (
            <h3>
                Loading videos...
            </h3>
        )
    }
    const [ selectedVideo, setSelectedVideo ] = useState(videos[0])
    const [ otherVideos, setOtherVideos ] = useState<Video[]>(videos.slice(1));

    useEffect(() => {
        setOtherVideos([...videos.filter(video => video.id !== selectedVideo.id)]);
    }, [selectedVideo])

    return (
        <div className={styles.videos_container}>
            <div className={styles.selected_video_container}>
                <TrailerVideo videoId={selectedVideo.key} />
            </div>
            <div className={styles.other_videos_container}></div>
        </div>
    )
}