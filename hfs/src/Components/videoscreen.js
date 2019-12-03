import React from "react";
import { LocalMediaList, RemoteMediaList } from '@andyet/simplewebrtc';
import MediaPreview from './mediapreview';
import Filter from './filter';

export default class VideoScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = { filter: null };
    }

    set_filter = filter => {
        this.setState({ filter: filter });
    };

    render() {
        const { filter } = this.state;
        return (
            <div>
                {filter === "red" && 
                    <div className="red-filter" >
                        {/* <div style={{ width: "62vh" }}> */}
                        <LocalMediaList
                            screen={false}
                            render={({ media }) => {
                                //console.log(media);
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
                                //console.log(media);
                                const audioStreams = media.filter(m => m.kind === 'audio');
                                const videoStreams = media.filter(m => m.kind === 'video');
                                const latestAudio = audioStreams[audioStreams.length - 1];
                                const latestVideo = videoStreams[videoStreams.length - 1];
                                return <MediaPreview video={latestVideo} audio={latestAudio} />;
                            }}
                        />
                        {/* </div> */}
                    </div>
                }
                {filter === "green" &&
                    <div className="green-filter" >
                        {/* <div style={{ width: "62vh" }}> */}
                        <LocalMediaList
                            screen={false}
                            render={({ media }) => {
                                //console.log(media);
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
                                //console.log(media);
                                const audioStreams = media.filter(m => m.kind === 'audio');
                                const videoStreams = media.filter(m => m.kind === 'video');
                                const latestAudio = audioStreams[audioStreams.length - 1];
                                const latestVideo = videoStreams[videoStreams.length - 1];
                                return <MediaPreview video={latestVideo} audio={latestAudio} />;
                            }}
                        />
                        {/* </div> */}
                    </div>
                }
                {filter === "blue" &&
                    <div className="blue-filter" >
                        {/* <div style={{ width: "62vh" }}> */}
                        <LocalMediaList
                            screen={false}
                            render={({ media }) => {
                                //console.log(media);
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
                                //console.log(media);
                                const audioStreams = media.filter(m => m.kind === 'audio');
                                const videoStreams = media.filter(m => m.kind === 'video');
                                const latestAudio = audioStreams[audioStreams.length - 1];
                                const latestVideo = videoStreams[videoStreams.length - 1];
                                return <MediaPreview video={latestVideo} audio={latestAudio} />;
                            }}
                        />
                        {/* </div> */}
                    </div>
                }
                {filter === "warm" &&
                    <div className="warm-filter" >
                        {/* <div style={{ width: "62vh" }}> */}
                        <LocalMediaList
                            screen={false}
                            render={({ media }) => {
                                //console.log(media);
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
                                //console.log(media);
                                const audioStreams = media.filter(m => m.kind === 'audio');
                                const videoStreams = media.filter(m => m.kind === 'video');
                                const latestAudio = audioStreams[audioStreams.length - 1];
                                const latestVideo = videoStreams[videoStreams.length - 1];
                                return <MediaPreview video={latestVideo} audio={latestAudio} />;
                            }}
                        />
                        {/* </div> */}
                    </div>
                }
                {filter === "cool" &&
                    <div className="cool-filter" >
                        {/* <div style={{ width: "62vh" }}> */}
                        <LocalMediaList
                            screen={false}
                            render={({ media }) => {
                                //console.log(media);
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
                                //console.log(media);
                                const audioStreams = media.filter(m => m.kind === 'audio');
                                const videoStreams = media.filter(m => m.kind === 'video');
                                const latestAudio = audioStreams[audioStreams.length - 1];
                                const latestVideo = videoStreams[videoStreams.length - 1];
                                return <MediaPreview video={latestVideo} audio={latestAudio} />;
                            }}
                        />
                        {/* </div> */}
                    </div>
                }
                {filter === null &&
                    <div style={{ width: "62vh" }}>
                        {/* <div style={{ width: "62vh" }}> */}
                        <LocalMediaList
                            screen={false}
                            render={({ media }) => {
                                //console.log(media);
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
                                //console.log(media);
                                const audioStreams = media.filter(m => m.kind === 'audio');
                                const videoStreams = media.filter(m => m.kind === 'video');
                                const latestAudio = audioStreams[audioStreams.length - 1];
                                const latestVideo = videoStreams[videoStreams.length - 1];
                                return <MediaPreview video={latestVideo} audio={latestAudio} />;
                            }}
                        />
                        {/* </div> */}
                    </div>
                }

                <Filter set_filter={this.set_filter} />
            </div>
        );
    } 
}
