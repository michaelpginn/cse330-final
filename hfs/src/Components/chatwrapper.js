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
        console.log("CURRENTROOM")
        console.log(currentRoom);
        return (
            <div>
                {currentRoom &&
                    <React.Fragment><h2>You're chatting with {currentRoom.otherUser.username}</h2>
                        <hr />
                        <ul>
                            {currentRoom.messages.map(message => (
                                <li>
                                    <text style={{ fontWeight: 'bold', }}>{message.senderUsername} : </text>
                                </li>
                            ))}
                        </ul>
                        <div style={{ marginLeft: -20, marginRight: -20, marginBottom: -20, padding: 20, backgroundColor: "#EEE", display: 'flex', }}>
                            <input type="text" value={newMessage} onChange={this.changeMessage} style={{ flex: 1 }} placeholder="Type your message..." />
                            <button style={{ height: 31 }} onClick={this.sendMessage}>Send Message</button>
                        </div>
                    </React.Fragment>}
            </div>
        );
    }
}
