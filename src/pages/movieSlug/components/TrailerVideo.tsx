import React from 'react';

interface Props {
    videoId: string | undefined
}

export function TrailerVideo({ videoId }: Props) {
    console.log(videoId)
    return (
        <div className="ratio ratio-16x9" id='youtube_video'>
            <iframe 
                src={`https://www.youtube.com/embed/${videoId}`} 
                title='Video' 
                style={{maxWidth: '100%', height: '100%'}}
                allowFullScreen 
            />
        </div>
    )
}