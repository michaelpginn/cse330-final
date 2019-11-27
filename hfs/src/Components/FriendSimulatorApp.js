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
            currentRoom: null, //{roomId, otherUser: {username, rating}, messages: []}
            error: null
        }
    }
    componentDidMount = async () => {
        try {
            this.socket = openSocket(INSTANCE_URL);
            this.socket.on('connect', () => { this.setState({ connected: true }) });
            this.socket.on('room_changed', this.room_changed);
            this.socket.on('new_message', this.new_message);
        } catch (error) {
            console.log(error);
        }
    };

    // listener funcs
    room_changed = (roomId, otherUser) => {
        console.log(roomId);
        if (!roomId) {
            // we are not in a room now
            this.setState({ currentRoom: null });
        } else {
            this.setState({ currentRoom: { roomId, otherUser, messages: [] } });
        }
    }

    new_message = (messageText, senderUsername) => {
        const { currentRoom } = this.state;
        const newMessage = { senderUsername, messageText }
        const newRoom = { ...currentRoom, messages: [...currentRoom.messages, newMessage] }
        console.log(newRoom);
        this.setState({ currentRoom: newRoom });
    };

    // emitter funcs
    set_username = username => {
        this.socket.emit("set_username", username, (error) => { this.usernameErrorFunc(error, username) });
    };

    send_message = (messageText) => {
        this.socket.emit("send_message", messageText, this.errorFunc);
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

    

    render() {
        const { connected, currentUsername, error, currentRoom } = this.state;
        return (
            <div style={{ display: "flex", height: "100vh", flexDirection: "column", }}>
                <Header />
                <div style={{ display: "flex", alignItems: "stretch", flex: 1 }}>
                    {currentUsername ? (
                        <React.Fragment>
                            {connected ? (
                                <div>
                                    <div>
                                        <h1>Hey, {currentUsername}!</h1>
                                        {/* Connect to a room with a name */}
                         
                                        <SWRTC.Room name={currentRoom ? currentRoom.roomId : currentUsername} >
                                            {() => {
                                                return <VideoScreen />
                                            }}
                                        </SWRTC.Room>
                                    </div>
                                    <ChatWrapper currentRoom={currentRoom} send_message={this.send_message} />
                                </div>)
                                :
                                (<div>Could not connect to socket, server may not be running.</div>)}
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