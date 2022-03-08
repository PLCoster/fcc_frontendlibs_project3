import React from 'react';

import DrumPad from './DrumPad';

import padAudioInfo from '../assets/audio/audioLoader';

function PadDisplay({ pressedKeys, setDisplayMessage }) {
  return (
    <div id="pad-container">
      {padAudioInfo.map(({ id, text, src }) => (
        <DrumPad
          key={id}
          id={id}
          text={text}
          src={src}
          playSound={pressedKeys[id]}
          setDisplayMessage={setDisplayMessage}
        />
      ))}
    </div>
  );
}

export default PadDisplay;
