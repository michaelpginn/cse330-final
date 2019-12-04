import React from "react";

export default class LoginView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            interest: ""
        };
    }

    changeUsername = event => {
        this.setState({ username: event.target.value === "" ? null : event.target.value });
    };

    changeInterest = event => {
        this.setState({ interest: event.target.value === "" ? null : event.target.value });
    }

    render() {
        const { set_username } = this.props;
        const { username, interest } = this.state;
        return (
            <div className="login-card">
                <h3>Login</h3>
                <hr style={{ marginBottom: 20, marginTop: 40 }} />
                Choose a username to use for this session.
                <div style={{ height: 20 }} />
                <input className="wide-textfield" type="text" id="username_input" value={username} onChange={this.changeUsername} placeholder="Username*" autoFocus/>
                <input className="wide-textfield" type="text" value={interest} onChange={this.changeInterest} placeholder="Add an interest, one word (optional)" />
                <div style={{ height: 20 }} />
                <button className="login-button" onClick={() => { set_username(username, interest); }} >Login</button>
            </div>
        )
    }
}