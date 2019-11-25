import React from 'react';
import { Video, VolumeMeter, Volume } from '@andyet/simplewebrtc';
import styled from 'styled-components';

import "./components.css";

const NoVideo = styled.div({
    backgroundColor: "#333",
    width: '100%',
    height: '100%'
})

const Container = styled.div({
    height: '50%',
    '& video': {
        width: '100%',
        height: '100%',
        objectFit: 'fill',
        backgroundColor: '#262a2c'
    }
});

// MediaPreview displays a camera feed if video is provided, and a VolumeMeter
// if audio is provided.
const MediaPreview = ({ audio, video }) => (
    <Container>
        {video && video.loaded ? <Video media={video} /> : <NoVideo />}
        {/* {audio ? (
            <VolumeMeter
                media={audio}
                render={({ volume, speaking }) => (
                    <VolumeMeter buckets={20} volume={volume + 100} speaking={speaking} />
                )}
            />
        ) : null} */}
    </Container>
);

export default MediaPreview;