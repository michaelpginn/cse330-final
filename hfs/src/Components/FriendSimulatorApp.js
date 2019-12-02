import React from "react";
import * as SWRTC from '@andyet/simplewebrtc';
import openSocket from 'socket.io-client';

import ChatWrapper from "./chatwrapper";
import VideoScreen from "./videoscreen";
import LoginView from "./loginview";
import Rating from "./rating";
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
            this.socket.on('connect', this.connected);
            this.socket.on('room_changed', this.room_changed);
            this.socket.on('new_message', this.new_message);

            
        } catch (error) {
            console.log(error);
        }
    };

    // from https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
    sleep = ms => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
      
    // listener funcs
    connected = () => {
        this.setState({ connected: true });
    };

    room_changed = (roomId, otherUser) => {
        if (!roomId) {
            // we are not in a room now
            this.setState({ currentRoom: null });
            // ask for a new chat partner
            this.sleep(1000).then(() => { this.find_room() });
        } else {
            //console.log("NEW ROOM ID: ");
            //console.log(roomId);
            this.setState({ currentRoom: { roomId, otherUser, messages: [] } }, () => {
                this.new_message(`You are chatting with ${otherUser.username}. Say hi!`);
                console.log(otherUser);
            });
        }
    }

    new_message = (messageText, senderUsername) => {
        const { currentRoom } = this.state;
        const newMessage = { senderUsername, messageText };
        const newRoom = { ...currentRoom, messages: [...currentRoom.messages, newMessage] };
        this.setState({ currentRoom: newRoom });
    };

    // emitter funcs
    set_username = username => {
        this.socket.emit("set_username", username, (error) => { this.usernameErrorFunc(error, username) });
    };

    send_message = (messageText) => {
        this.socket.emit("send_message", messageText, this.errorFunc);
    };

    exit_room = () => {
        this.socket.emit("exit_room", this.errorFunc);
    };

    // we only have to check once. If we can't find a user, the next time someone becomes free, they will call this function and hopefully match with us. It's not super fair (someone could be stuck for a while with no partner) but it works for us.
    find_room = () => {
        console.log("finding room....")
        this.socket.emit("find_room", this.errorFunc);
    };

    rate_user = rating => {
        console.log("sending " + rating);
        this.socket.emit("rate_user", rating);
    };


    usernameErrorFunc = (error, username) => {
        if (error) {
            console.log(error);
            this.errorFunc(error);
        } else {
            this.setState({ currentUsername: username });
            // find the first room
            this.sleep(1000).then(() => { this.find_room() });
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
                <Header currentUsername={currentUsername} />
                <div style={{ display: "flex", alignItems: "stretch", flex: 1 }}>
                    {currentUsername ? (
                        <React.Fragment>
                            {connected ? (
                                <React.Fragment>
                                    {currentRoom ? (
                                        <React.Fragment>
                                            {/* Request user's info */}
                                            <SWRTC.RequestUserMedia audio video auto share />
                                            {/* Connect to a room with a name */}
                                            <SWRTC.Room name={currentRoom.roomId} >
                                                {({ room }) => {
                                                    //console.log("_______CURRENT ROOM_______");
                                                    //console.log(room);
                                                    return <VideoScreen />;
                                                }}
                                            </SWRTC.Room>
                                            <React.Fragment>
                                                <Rating currentRoom={currentRoom} rate_user={this.rate_user} />
                                                <ChatWrapper currentRoom={currentRoom} send_message={this.send_message} exit_room={this.exit_room} />
                                            </React.Fragment>
                                        </React.Fragment>
                                    ) :
                                        <React.Fragment>
                                            <div>Searching for chat partner...</div>
                                            
                                        </React.Fragment>
                                    }
                                    
                                </React.Fragment>)
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