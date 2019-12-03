import React from "react";
import StarRatingComponent from 'react-star-rating-component';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = { rating: null, sent: false };
    }

    rateUser = () => {
        const { rate_user } = this.props;
        const { rating } = this.state;
        rate_user(rating);
        this.setState({ rating: null, sent: true });
    };

    onStarClick = (nextValue, prevValue, name) => {
        this.setState({ rating: nextValue });
    };

    render() {
        const { currentRoom } = this.props;
        const { rating, sent } = this.state;
        return (
            <div className="chat-input rating">
                Current rating:
                <div style={{ fontWeight: "bold", marginLeft: 4 }}>{currentRoom && currentRoom.otherUser.rating || "Not yet rated"}</div>
                <div style={{flex:1}}/>
                {currentRoom && (
                    sent ? (
                        <React.Fragment>
                        Rating sent!
                        </React.Fragment>
                    ) : (
                            <React.Fragment>
                                Rate your conversation with {currentRoom.otherUser.username}:
                                <div style={{width: 4}}/>
                                <StarRatingComponent
                                    name="Rating"
                                    starCount={5}
                                    value={rating}
                                    onStarClick={this.onStarClick}
                                />
                                <div style={{width: 4}}/>
                                <button onClick={this.rateUser}>Send Rating!</button>
                                
                            </React.Fragment>
                        )
                )}
                
                
            </div>
        );
    }
    
}