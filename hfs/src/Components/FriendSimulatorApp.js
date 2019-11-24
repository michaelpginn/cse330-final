import React from "react";
import * as SWRTC from '@andyet/simplewebrtc';
import openSocket from 'socket.io-client';
import ChatWrapper from "./chatwrapper";
import VideoScreen from "./videoscreen";

export default class FriendSimulatorApp extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            connected: false
        }
    }
    componentDidMount = async () => {
        try {
            this.socket = openSocket('http://ec2-18-216-4-66.us-east-2.compute.amazonaws.com:3456');
            this.socket.on('connect', () => { this.setState({connected: true}) })
        } catch (error) {
            console.log(error);
        }
        
    };

    render() {
        const { connected } = this.state;
        return (
        
            <React.Fragment>
                {/* Connect to a room with a name and optional password */}
                {connected ? (
                    <div>
                        <SWRTC.Room name="test" >
                            {() => {
                                return <VideoScreen />
                            }}
                        </SWRTC.Room>
                        <ChatWrapper />
                    </div>)
                    :
                    <div>Could not connect to socket, server may not be running.</div>}
                
            </React.Fragment>
            

        );
    }
}