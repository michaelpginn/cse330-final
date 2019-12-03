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
                    </React.Fragment>
                }
            </React.Fragment>
        );
    }
}
