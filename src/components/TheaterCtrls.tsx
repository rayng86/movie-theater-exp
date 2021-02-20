import React from 'react';
import { ScreenViews } from '../types';

type TheaterCtrlsProps = {
  isProjectorOn: boolean,
  setCurtainState: Function,
  curtainState: boolean,
  toggleLights: () => void,
  toggleProjector: () => void,
  toggleBgMusic: () => void,
  changeScreenView: (view: ScreenViews) => void,
}

const TheaterCtrls = ({
  isProjectorOn,
  setCurtainState,
  curtainState,
  toggleLights,
  toggleProjector,
  toggleBgMusic,
  changeScreenView,
}: TheaterCtrlsProps) => (
  <div style={{ zIndex: 6, margin: '20px 0', position: 'fixed', marginRight: 'auto', marginLeft: 'auto', left: 0, right: 0 }}>
    <button
      disabled={isProjectorOn}
      onClick={() => setCurtainState(!curtainState)}
    >
      Toggle Curtains
    </button>
    <button onClick={toggleLights}>Dim Lights On/Off</button>
    <button disabled={!curtainState} onClick={toggleProjector}>
      Turn Projector On/Off
    </button>
    <button disabled={!isProjectorOn} onClick={() => changeScreenView(ScreenViews.trivia)}>
      Trivia Mode
    </button>
    <button disabled={!isProjectorOn} onClick={() => changeScreenView(ScreenViews.credits)}>
      Credits Roll
    </button>
    <button onClick={toggleBgMusic}>
      Toggle Background Music
    </button>
    <button
      disabled={!isProjectorOn}
      onClick={() => changeScreenView(ScreenViews.trailers)}
    >
      Play Trailers
    </button>
    <button
      disabled={!isProjectorOn}
      onClick={() => changeScreenView(ScreenViews.silentPolicyPreroll)}
    >
      Silence Phones Preroll
    </button>
  </div>
);

export default TheaterCtrls;
