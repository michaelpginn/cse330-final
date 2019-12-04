import React from "react";
import MemeTray from "./memetray";


export default class ChatWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newMessage: "",
            gifCode: null
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

    sendGifMessage = () => {
        const { send_gif_message } = this.props;
        const { gifCode } = this.state;
        send_gif_message(gifCode);
        this.setState({ gifCode: null });
    }

    handleKeyPress = (event) => {
        const { exit_room } = this.props;

        if (event.key === "Enter") {
            this.sendMessage();
        } else if (event.keyCode === 27) {
            exit_room();
        }
    }

    render() {
        const { currentRoom, exit_room } = this.props;
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
                                    {message.messageText}
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
                        <MemeTray/>
                    </div>
                    </React.Fragment>
                }
            </React.Fragment>
        );
    }
}
