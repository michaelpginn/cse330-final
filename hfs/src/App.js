import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import * as SWRTC from '@andyet/simplewebrtc';
import FriendSimulatorApp from './Components/FriendSimulatorApp';

const API_KEY = "9efd1b765b3af86fbdf1cd42";
const CONFIG_URL = `https://api.simplewebrtc.com/config/guest/${API_KEY}`;

const store = SWRTC.createStore();

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <SWRTC.Provider configUrl={CONFIG_URL}>
          <SWRTC.Connecting>
            <h1>Connecting...</h1>
          </SWRTC.Connecting>
          <SWRTC.Connected>
            <h1>Conneected!</h1>
            {/* Request user's info */}
            <SWRTC.RequestUserMedia audio video auto share/>

            {/* Enable playing remote audio. */}
            <SWRTC.RemoteAudioPlayer />
          
            <FriendSimulatorApp/>
          </SWRTC.Connected>

        </SWRTC.Provider>
      </Provider>
    </div>
  );
}

export default App;
