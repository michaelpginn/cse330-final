import { Video, VolumeMeter } from '@andyet/simplewebrtc';
//import MicIcon from 'material-icons-svg/components/baseline/Mic';
import React from 'react';

const NoVideo = () => (
    <p>No video selected</p>
);

// MediaPreview displays a camera feed if video is provided, and a VolumeMeter
// if audio is provided.
const MediaPreview = ({ audio, video }) => (
    <div>
        {video && video.loaded ? <Video media={video} /> : <NoVideo />}
        {audio ? (
            <VolumeMeter
                media={audio}
                render={({ volume, speaking }) => (
                    <div>Videeeeeee</div>
                    //<Volume>
                    //<Meter buckets={20} volume={volume + 100} speaking={speaking} />
                    //<MicIcon />
                    //</Volume>
                )}
            />
        ) : null}
    </div>
);

export default MediaPreview;