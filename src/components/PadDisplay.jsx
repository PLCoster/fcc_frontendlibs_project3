import React from 'react';

import DrumPad from './DrumPad';

import padAudioInfo from '../assets/audio/audioLoader';

function PadDisplay() {
  return (
    <div id="pad-container">
      {padAudioInfo.map(({ id, text, src }) => (
        <DrumPad key={id} id={id} text={text} src={src} />
      ))}
    </div>
  );
}

export default PadDisplay;
