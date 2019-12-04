import React from "react";

import { GIFCODES } from "../gifcodes";
import arnold from "../gifs/arnold.gif";
import lionking from "../gifs/lionking.gif";
import washu from "../gifs/washu.gif";
import spiderman from "../gifs/spiderman.gif";
import dog from "../gifs/dog.gif";


export default function GifImage(props) {
    const { gifCode } = props; 
    let image;
    switch (gifCode) {
        case GIFCODES.ARNOLD:
            image = arnold;
            break;
        case GIFCODES.LIONKING:
            image = lionking;
            break;
        case GIFCODES.WASHU:
            image = washu;
            break;
        case GIFCODES.SPIDERMAN:
            image = spiderman;
            break;
        case GIFCODES.DOG:
            image = dog;
            break;
        default:
            break;
    }
    return <img src={image} style={{ width: 'auto', height: '20vh' }}/>
}