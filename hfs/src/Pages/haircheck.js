import { LocalMediaList } from '@andyet/simplewebrtc';
// import MicIcon from 'material-icons-svg/components/baseline/Mic';
// import VideocamIcon from 'material-icons-svg/components/baseline/Videocam';
import React from 'react';
//import styled, { css } from 'styled-components';
// import Placeholders from '../contexts/Placeholders';
// import { TalkyButton } from '../styles/button';
// import mq from '../styles/media-queries';
// import { colorToString } from '../utils/colorify';
// import { Error, Info } from './Alerts';
// import DeviceDropdown from './DeviceDropdown';
// import DeviceSelector from './DeviceSelector';
// import InputChecker from './InputChecker';
import MediaPreview from './MediaPreview';
// import ShareControls from './ShareControls';

// const Container = styled.div({
//     display: 'grid',
//     gridTemplateAreas: `
//     'header'
//     'preview'
//     'controls'
//   `,
//     gridRowGap: '10px',
//     gridColumnGap: '10px',
//     [mq.SMALL_DESKTOP]: {
//         gridTemplateColumns: 'repeat(2, 1fr)',
//         gridTemplateAreas: `
//       'header header'
//       'preview controls'
//     `
//     }
// });

// const Header = styled.div({
//     gridArea: 'header'
// });

// const Controls = styled.div`
//   grid-area: controls;
//   padding: 0 10px;
//   ${mq.SMALL_DESKTOP} {
//     padding: 0;
//     width: 300px;
//   }
//   select {
//     border: ${({ theme }) => css`1px solid ${colorToString(theme.border)}`};
//     color: ${({ theme }) => colorToString(theme.foreground)};
//     height: 40px;
//     padding: 10px;
//     margin-top: 5px;
//     background-color: ${({ theme }) => colorToString(theme.background)};
//     font-size: 12px;
//     font-weight: bold;
//     width: 100%;
//   }
//   label {
//     display: block;
//     font-weight: bold;
//     font-size: 12px;
//     margin-top: 10px;
//     margin-bottom: 10px;
//     svg {
//       font-size: 20px;
//       vertical-align: middle;
//       margin-right: 5px;
//       fill: ${({ theme }) => colorToString(theme.foreground)};
//     }
//   }
// `;

// const Preview = styled.div({
//     gridArea: 'preview',
//     display: 'flex',
//     alignItems: 'flex-end',
//     flexDirection: 'column'
// });

// const PermissionButton = styled(TalkyButton)({
//     marginBottom: '5px',
//     width: '100%'
// });

const Haircheck = () => (
    <LocalMediaList
    screen= { false}
    render = {({ media }) => {
    const audioStreams = media.filter(m => m.kind === 'audio');
    const videoStreams = media.filter(m => m.kind === 'video');
    const latestAudio = audioStreams[audioStreams.length - 1];
    const latestVideo = videoStreams[videoStreams.length - 1];

    return <MediaPreview video={ latestVideo } audio = { latestAudio } />;
}}
/>
    //< /div>
    // < ShareControls />
    // </Controls>
    // < /Container>
);

export default Haircheck;