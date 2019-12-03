import React from "react";

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = { filter: null };
    }

    changeFilter = event => {
        this.setState({ filter: event.target.value });
    };

    setFilter = () => {
        const { set_filter } = this.props;
        const { filter } = this.state;
        set_filter(filter);
    };

    render() {
        return (
            <div>
                <div className="chat-input" >
                        <div>
                        <text style={{ fontSize: '2vh' }}>Choose a filter: </text>
                        <input type="radio" name="filter" id="red" value="red" onClick={this.changeFilter} />Red
                        <input type="radio" name="filter" id="green" value="green" onClick={this.changeFilter} />Green
                        <input type="radio" name="filter" id="blue" value="blue" onClick={this.changeFilter} />Blue
                        <input type="radio" name="filter" id="warm" value="warm" onClick={this.changeFilter} />Warm
                        <input type="radio" name="filter" id="cool" value="cool" onClick={this.changeFilter} />Cool
                        <button className="big-button" onClick={this.setFilter}>Select!</button>
                        </div>
                </div>
            </div>
        )
    }

}