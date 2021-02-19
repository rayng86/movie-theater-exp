import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import TravelCurtains from './components/TravelCurtain';
import { TriviaComponent } from './components/TriviaSlideComponent';
import { State, PossibleStates } from './types';

function App() {
  const [curtainState, setCurtainState] = useState(false);
  const [lightsState, setLights] = useState(false);
  const [screenState, toggleScreenState] = useState(false);
  const [playTrailersState, setPlayTrailersState] = useState(false);

  const [isTriviaMode, toggleTrivia] = useState(false);
  const [triviaData, setTriviaData] = useState<State>({
    kind: PossibleStates.initial,
  });
  useEffect(() => {
    setTriviaData({ kind: PossibleStates.loading });
    axios
      .get(
        'https://opentdb.com/api.php?amount=25&category=11&difficulty=easy&type=multiple'
      )
      .then((res: any) => {
        const data = res.data;
        setTriviaData({ kind: PossibleStates.success, data: data.results });
      })
      .catch((err: any) => {
        if (err.response) {
          console.log('error in response', err.response);
          setTriviaData({ kind: PossibleStates.error, errorStr: err.response });
        } else if (err.request) {
          console.log('error in request', err.request);
          setTriviaData({ kind: PossibleStates.error, errorStr: err.request });
        } else {
          console.log('something else went horribly wrong');
          setTriviaData({
            kind: PossibleStates.error,
            errorStr: 'something went wrong, try again later',
          });
        }
      });
  }, []);
  return (
    <div className="App">
      <div style={{ display: 'flex' }}>
        <div className="curtain">
          <div className={`lights ${lightsState ? 'dimmed' : ''}`} />
          <div className={`curtain-wrapper ${curtainState ? 'open' : ''}`}>
            <TravelCurtains curtainAlignedPosition="left" />

            <div
              className="front-stage-content"
              style={lightsState && screenState ? { zIndex: 4 } : { zIndex: 1 }}
            >
              <div className={`screen ${screenState ? '' : 'off'}`}>
                {screenState &&
                  isTriviaMode &&
                  triviaData.kind === PossibleStates.success && (
                    <TriviaComponent triviaData={triviaData.data} />
                  )}
                {screenState && playTrailersState && (
                  <>
                    <video
                      width="100%"
                      height="100%"
                      autoPlay
                      style={{ objectFit: 'fill' }}
                    >
                      <source src="trailer1.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </>
                )}
              </div>
            </div>

            <TravelCurtains curtainAlignedPosition="right" />
          </div>
        </div>
      </div>
      <div></div>
      <button
        disabled={screenState}
        onClick={() => setCurtainState(!curtainState)}
      >
        Toggle Curtains
      </button>
      <button onClick={() => setLights(!lightsState)}>Dim Lights On/Off</button>
      <button
        disabled={!curtainState}
        onClick={() => toggleScreenState(!screenState)}
      >
        Turn Projector On/Off
      </button>
      <button
        disabled={!screenState}
        onClick={() => toggleTrivia(!isTriviaMode)}
      >
        Play Trivias
      </button>
      <button
        disabled={!screenState}
        onClick={() => setPlayTrailersState(!playTrailersState)}
      >
        Play Trailers
      </button>
      {triviaData && (
        <p style={{ color: 'white' }}>{JSON.stringify(triviaData)}</p>
      )}
    </div>
  );
}

export default App;
