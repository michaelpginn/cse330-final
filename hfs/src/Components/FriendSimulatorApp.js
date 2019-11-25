import React from "react";
import * as SWRTC from '@andyet/simplewebrtc';
import openSocket from 'socket.io-client';

import ChatWrapper from "./chatwrapper";
import VideoScreen from "./videoscreen";
import "./components.css";
import Header from "./header";

export default class FriendSimulatorApp extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            connected: false
        }
    }
    componentDidMount = async () => {
        try {
            this.socket = openSocket('https://ec2-18-216-4-66.us-east-2.compute.amazonaws.com:8000');
            this.socket.on('connect', () => { this.setState({connected: true}) })
        } catch (error) {
            console.log(error);
        }
        
    };

    render() {
        const { connected } = this.state;
        return (
            <div style={{ display: "flex", height: "100vh", flexDirection: "column" }}>
                <Header />
                <div style={{ display: "flex" }}>
                    {/* Connect to a room with a name and optional password */}
                    {connected ? (
                        <div>
                            <SWRTC.Room name="test" >
                                {() => {
                                    return <VideoScreen />
                                }}
                            </SWRTC.Room>
                        </div>)
                        :
                        <div>Could not connect to socket, server may not be running.</div>
                    }
                    <ChatWrapper />
                </div>
            </div>
            

        );
    }
}