import React from 'react';

type TheaterCtrlsProps = {
  screenState: boolean,
  setCurtainState: Function,
  curtainState: boolean,
  toggleLights: () => void,
  toggleScreenProjector: () => void,
  toggleTrivia: Function,
  isTriviaMode: boolean,
  toggleBgMusic: () => void,
}

const TheaterCtrls = ({
  screenState,
  setCurtainState,
  curtainState,
  toggleLights,
  toggleScreenProjector,
  toggleTrivia,
  isTriviaMode,
  toggleBgMusic,
}: TheaterCtrlsProps) => (
  <div style={{ zIndex: 6, margin: '20px 0' }}>
    <button
      disabled={screenState}
      onClick={() => setCurtainState(!curtainState)}
    >
      Toggle Curtains
    </button>
    <button onClick={toggleLights}>Dim Lights On/Off</button>
    <button disabled={!curtainState} onClick={toggleScreenProjector}>
      Turn Projector On/Off
    </button>
    <button disabled={!screenState} onClick={() => toggleTrivia(!isTriviaMode)}>
      Trivia Mode
    </button>
    <button onClick={toggleBgMusic}>
      Toggle Background Music
    </button>
    {/* <button
      disabled={!screenState}
      onClick={() => setPlayTrailersState(!playTrailersState)}
    >
      Play Trailers
    </button> */}
  </div>
);

export default TheaterCtrls;
