import React from "react";
import { LocalMediaList, RemoteMediaList } from '@andyet/simplewebrtc';
import MediaPreview from './mediapreview';
import filters from "../filters"

export default class VideoScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = { pickingFilter: false};
    }

    setFilter = (filter) => {
        const { set_filter } = this.props;
        return () => {
            set_filter(filter);
            this.setState({ pickingFilter: false });
        }
    }


    render() {
        const { myFilter, otherFilter} = this.props;
        const { pickingFilter } = this.state;
        //const myFilter = "red-filter"
        return (
            <div style={{ display: "flex", flexDirection: "column", width: '62vh' }}>
                
                <div className="vid-div">
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
                    <div className={`filter-box ${myFilter || ""}`}/>
                    <div className="filter-box" style={{zIndex: 2}}>
                        {
                            pickingFilter ? (
                                <div class="filter-picker-bg">
                                    <button class="translucent-button" onClick={this.setFilter(filters.Filters.RED)}>Red</button>
                                    <button class="translucent-button" onClick={this.setFilter(filters.Filters.GREEN)}>Green</button>
                                    <button class="translucent-button" onClick={this.setFilter(filters.Filters.BLUE)}>Blue</button>
                                    <button class="translucent-button" onClick={this.setFilter(filters.Filters.WARM)}>Warm</button>
                                    <button class="translucent-button" onClick={this.setFilter(filters.Filters.COOL)}>Cool</button>
                                    <button class="translucent-button" onClick={this.setFilter(null)}>No Filter</button>
                                </div>
                            ): (
                                <button onClick={()=>{this.setState({pickingFilter: true})}}>Pick filter</button>
                            )
                        }
                        
                    </div>
                </div>
                <div style={{ height: 1 }} />
                <div className="vid-div">
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
                    <div className={`filter-box ${otherFilter || ""}`}/>
                </div>
            </div>
        );
    } 
}
