import React from "react";

export default function Header(props) {
    const { currentUsername } = props;
    return (
        <header>
            Having Friends Simulator
            <div style={{ flex: 1 }} />
            {currentUsername && (<text style={{fontSize: '3vh'}}>Hello, {currentUsername}</text>)}
        </header>
    )
}