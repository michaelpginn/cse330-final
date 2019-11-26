import React from "react";

export default class LoginView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
        };
    }

    changeUsername = event => {
        this.setState({ username: event.target.value === "" ? null : event.target.value });
    };

    render() {
        const { set_username } = this.props;
        const { username } = this.state;
        return (
            <div>
                <h3>Login</h3>
                <hr style={{ marginBottom: 20, marginTop: 40 }} />
                Choose a username to use for this session.
                <div style={{ height: 20 }} />
                <input type="text" id="username_input" value={username} onChange={this.changeUsername} placeholder="Username" />
                <div style={{ height: 20 }} />
                <button onClick={() => { set_username(username); }} >Login</button>
            </div>
        )
    }
}