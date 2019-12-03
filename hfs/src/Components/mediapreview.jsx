import React from 'react';
import { Video } from '@andyet/simplewebrtc';
import styled from 'styled-components';

import "./components.css";

const NoVideo = styled.div({
    backgroundColor: "#262a2c",
    width: '100%',
    height: '100%'
})

const Container = styled.div({
    height: '100%',
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
    </Container>
);

export default MediaPreview;