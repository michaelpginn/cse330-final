import React from "react";
import arnold from "../gifs/arnold.gif";
import lionking from "../gifs/lionking.gif";
import washu from "../gifs/washu.gif";
import spiderman from "../gifs/spiderman.gif";
import dog from "../gifs/dog.gif";

export default class MemeTray extends React.Component{
    render() {
        return (
            <React.Fragment>
                <div>Send a meme</div>
                <div style={{ display: "flex", justifyContent: "flex-start", marginLeft: 10 }}>
                    <MemeButton image={arnold}/>
                    <MemeButton image={lionking} />
                    <MemeButton image={washu} />
                    <MemeButton image={spiderman} />
                    <MemeButton image={dog}/>
                </div>
            </React.Fragment>
            
        );
    }
}

function MemeButton(props) {
    const { image} = props;
    return (
        <div style={{width: 100, display: "flex", justifyContent:"center", marginRight: 10}} >
            <img src={image} style={{ maxHeight: "100%", maxWidth: "100%"}}/>
        </div>
    )
}