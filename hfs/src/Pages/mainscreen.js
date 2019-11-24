import React from "react";
import ChatWrapper from "./ChatWrapper";
import VideoScreen from "./VideoScreen";

export default class MainScreen extends React.Component {
    render() {
        const {  } = this.props;
        return (
            <React.Fragment>
                <div style={{ display: 'flex', flexDirection: 'row', flex: 1 }}>
                    <div>oop</div>
                    <ChatWrapper />
                    <VideoScreen />
                </div>
            </React.Fragment>
        );
    }
}