import React from "react";
import { LocalMediaList, RemoteMediaList } from '@andyet/simplewebrtc';
import MediaPreview from './mediapreview';

export default function VideoScreen() {

    return (
        <div style={{width: "62vh"}}>
            <LocalMediaList
                screen={false}
                render={({ media }) => {
                    console.log(media);
                    const audioStreams = media.filter(m => m.kind === 'audio');
                    const videoStreams = media.filter(m => m.kind === 'video');
                    const latestAudio = audioStreams[audioStreams.length - 1];
                    const latestVideo = videoStreams[videoStreams.length - 1];
                    return <MediaPreview video={latestVideo} audio={latestAudio} />;
                }}
            />
            <div style={{ height: 1 }} />
            <RemoteMediaList
                audio={true}
                video={true}
                render={({ media }) => {
                    console.log(media);
                    const audioStreams = media.filter(m => m.kind === 'audio');
                    const videoStreams = media.filter(m => m.kind === 'video');
                    const latestAudio = audioStreams[audioStreams.length - 1];
                    const latestVideo = videoStreams[videoStreams.length - 1];
                    return <MediaPreview video={latestVideo} audio={latestAudio} />;
                }}
            />
        </div>
    );
}
