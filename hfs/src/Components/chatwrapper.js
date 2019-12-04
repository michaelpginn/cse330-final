import React from "react";
import MemeTray from "./memetray";
import GifImage from "./gifimage";



export default class ChatWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newMessage: ""
        };
    }

    changeMessage = event => {
        this.setState({ newMessage: event.target.value });
    };

    sendMessage = () => {
        const { send_message } = this.props;
        const { newMessage } = this.state;
        send_message(newMessage);
        this.setState({ newMessage: "" });
    };

    handleKeyPress = (event) => {
        const { exit_room } = this.props;

        if (event.key === "Enter") {
            this.sendMessage();
        } else if (event.keyCode === 27) {
            exit_room();
        }
    }

    

    render() {
        const { currentRoom, exit_room, send_gif_message } = this.props;
        const { newMessage } = this.state;
        return (
            <React.Fragment>
                {currentRoom &&
                    <React.Fragment>
                        <ul>
                            {currentRoom.messages.map((message, index) => (
                                <li key={index}>
                                    {
                                        message.senderUsername && (
                                            <text style={{ fontWeight: 'bold', }}>  {message.senderUsername} :
                                            </text>
                                        )
                                    }
                                    {message.messageText ? message.messageText : <GifImage gifCode={message.gifCode}/>}
                                </li>
                            ))}
                        </ul>
                        <div className="chat-input" >
                            <button className="big-button" onClick={exit_room}>Exit Chat<br />(Esc)</button>
                            <input autoFocus type="text" value={newMessage} onChange={this.changeMessage} className="chat-textbox" placeholder="Type your message..." onKeyPress={this.handleKeyPress} />
                            <button className="big-button" onClick={this.sendMessage}>Send Message</button>
                    </div>
                    <div style={{height: 10}}/>
                    <div className="chat-input" style={{height: 52}}>
                        <MemeTray send_gif_message={send_gif_message}/>
                    </div>
                    </React.Fragment>
                }
            </React.Fragment>
        );
    }
}

