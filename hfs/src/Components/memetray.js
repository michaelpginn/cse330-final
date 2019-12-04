import React from "react";
import arnold from "../gifs/arnold.gif";
import lionking from "../gifs/lionking.gif";
import washu from "../gifs/washu.gif";
import spiderman from "../gifs/spiderman.gif";
import dog from "../gifs/dog.gif";
import { GIFCODES} from "../gifcodes";

export default class MemeTray extends React.Component{

    sendGifMessage = gifCode => {
        const { send_gif_message } = this.props;
        return () => {
            console.log(gifCode)
            send_gif_message(gifCode);
        }
    }

    render() {
        return (
            <React.Fragment>
                <div>Send a meme</div>
                <div style={{ display: "flex", justifyContent: "flex-start", marginLeft: 10 }}>
                    <MemeButton image={arnold} onClick={this.sendGifMessage(GIFCODES.ARNOLD)}/>
                    <MemeButton image={lionking} onClick={this.sendGifMessage(GIFCODES.LIONKING)}/>
                    <MemeButton image={washu} onClick={this.sendGifMessage(GIFCODES.WASHU)}/>
                    <MemeButton image={spiderman} onClick={this.sendGifMessage(GIFCODES.SPIDERMAN)}/>
                    <MemeButton image={dog} onClick={this.sendGifMessage(GIFCODES.DOG)}/>
                </div>
            </React.Fragment>
            
        );
    }
}

function MemeButton(props) {
    const { image, onClick } = props;
    return (
        <div style={{ width: 100, display: "flex", justifyContent: "center", marginRight: 10 }} onClick={onClick}>
            <img src={image} style={{ maxHeight: "100%", maxWidth: "100%" }} alt="Meme choice"/>
        </div>
    )
}