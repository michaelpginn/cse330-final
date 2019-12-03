import React from "react";

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = { rating: null, sent: false };
    }

    changeRating = event => {
        this.setState({ rating: event.target.value });
    };

    rateUser = () => {
        const { rate_user } = this.props;
        const { rating } = this.state;
        rate_user(rating);
        this.setState({ rating: null, sent: true });
    };

    render() {
        const { currentRoom } = this.props;
        const { rating, sent } = this.state;
        return (
            <div>
                <div className="chat-input" >
                    {sent ? (
                    <div>
                        {currentRoom && (<text style={{ fontSize: '2vh' }}>Rating Sent! </text>)}
                        {currentRoom && (<text style={{ fontSize: '2vh' }}>{currentRoom.otherUser.username}'s Current Rating: {currentRoom.otherUser.rating}</text>)}
                    </div>
                    ): (
                    <div>
                        {currentRoom && (<text style={{ fontSize: '2vh' }}>Rate {currentRoom.otherUser.username}:</text>)}
                        <input type="radio" name="rating" id="one" value="1" onClick={this.changeRating} />1★
                        <input type="radio" name="rating" id="two" value="2" onClick={this.changeRating} />2★
                        <input type="radio" name="rating" id="three" value="3" onClick={this.changeRating} />3★
                        <input type="radio" name="rating" id="four" value="4" onClick={this.changeRating} />4★
                        <input type="radio" name="rating" id="five" value="5" onClick={this.changeRating} />5★
                        <button className="big-button" onClick={this.rateUser}>Send Rating!</button>
                        {currentRoom && (<text style={{ fontSize: '2vh' }}>{currentRoom.otherUser.username}'s Current Rating: {currentRoom.otherUser.rating}</text>)}
                    </div>
                        )}
                
                </div>
        </div>
        )
    }
    
}