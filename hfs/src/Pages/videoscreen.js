import React from "react";
import PropTypes from "prop-types";
import { Provider } from 'react-redux';
import * as SWRTC from '@andyet/simplewebrtc';
import Haircheck from "./haircheck"

export default class VideoScreen extends React.Component {
    constructor(props) {
        super(props);
        //this.state = { event: null };
    }

    componentDidMount = () => {
        //const { user, setUser } = this.props;
    };

    render() {
        //const { switchPage, user } = this.props;
        //const { currentContent, event } = this.state;
        return (<div><Haircheck/></div>);
    }
}
