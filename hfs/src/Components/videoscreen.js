import React from "react";
import { LocalMediaList } from '@andyet/simplewebrtc';
import MediaPreview from './mediapreview';

export default function VideoScreen () {
    return (
        <LocalMediaList
            screen={false}
            render={({ media }) => {
                const audioStreams = media.filter(m => m.kind === 'audio');
                const videoStreams = media.filter(m => m.kind === 'video');
                const latestAudio = audioStreams[audioStreams.length - 1];
                const latestVideo = videoStreams[videoStreams.length - 1];
    
                return <MediaPreview video={latestVideo} audio={latestAudio} />;
            }}
        />
    );
}
