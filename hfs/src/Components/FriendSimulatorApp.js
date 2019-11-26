import React from "react";
import * as SWRTC from '@andyet/simplewebrtc';
import openSocket from 'socket.io-client';

import ChatWrapper from "./chatwrapper";
import VideoScreen from "./videoscreen";
import LoginView from "./loginview";
import "./components.css";
import Header from "./header";
import { INSTANCE_URL } from "../Instance"

export default class FriendSimulatorApp extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            connected: false,
            currentUsername: null,
            error: null
        }
    }
    componentDidMount = async () => {
        try {
            this.socket = openSocket(INSTANCE_URL);
            this.socket.on('connect', () => { this.setState({connected: true}) })
        } catch (error) {
            console.log(error);
        }
        
    };

    set_username = username => {
        this.socket.emit("set_username", username, (error) => { this.usernameErrorFunc(error, username) });
    };

    usernameErrorFunc = (error, username) => {
        if (error) {
            console.log(error);
            this.errorFunc(error);
        } else {
            this.setState({ currentUsername: username });
        }
    };

    errorFunc = error => {
        console.log(error);
        this.setState({ error });
        setTimeout(() => { this.setState({ error: null }) }, 4000)
    }

    send_message = (messageText) => {
        this.socket.emit("send_message", messageText, this.errorFunc);
    }

    render() {
        const { connected, currentUsername, error } = this.state;
        let currentRoom = { users: [currentUsername, null], messages: [] };
        return (
            <div style={{ display: "flex", height: "100vh", flexDirection: "column", }}>
                <Header />
                <div style={{ display: "flex", alignItems: "stretch", flex: 1 }}>
                    {currentUsername ? (
                        <React.Fragment>
                            <div>
                            <h1>Hey, {currentUsername}!</h1>
                            {/* Connect to a room with a name */}
                            {connected ? (

                                <SWRTC.Room name="test" >
                                    {() => {
                                        return <VideoScreen />
                                    }}
                                </SWRTC.Room>
                            )
                                :
                                <div>Could not connect to socket, server may not be running.</div>
                                }
                            </div>
                            <ChatWrapper currentRoom={currentRoom} send_message={this.send_message} />
                        </React.Fragment>
                    )
                        : (
                            <div>
                                <LoginView set_username={this.set_username} />
                                {error &&
                                    <p>{error}</p>
                                }
                            </div>
                        )}
                </div>
            </div>
            

        );
    }
}