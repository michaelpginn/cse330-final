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
        const { currentRoom } = this.props;
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
                            <input type="text" value={newMessage} onChange={this.changeMessage} style={{ flex: 1 }} placeholder="Type your message..." />
                            <button style={{ height: 31 }} onClick={this.sendMessage}>Send Message</button>
                        </div>
                    </React.Fragment>}
            </div>
        );
    }
}
