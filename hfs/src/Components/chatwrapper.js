import React from "react";

export default class ChatWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = { newMessage: "" };
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

    render() {
        const { currentRoom, exit_room } = this.props;
        const { newMessage } = this.state;
        return (
            <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: 10 }}>
                {currentRoom &&
                    <React.Fragment>
                        <ul>
                            {currentRoom.messages.map(message => (
                                <li>
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
                            <button className="big-button" onClick={exit_room}>Exit Chat<br/>(Esc)</button>
                            <input type="text" value={newMessage} onChange={this.changeMessage} className="chat-textbox" placeholder="Type your message..." />
                            <button className="big-button" onClick={this.sendMessage}>Send Message</button>
                        </div>
                    </React.Fragment>
                }
            </div>
        );
    }
}
