/* eslint-disable react/prop-types */
import React from 'react';

import DrumPad from './DrumPad';

import padAudioInfo from '../assets/audio/audioLoader';

// Container for 9 drum pads on RHS of Drum Machine
function PadDisplay({
  pressedKeys,
  setPressedKeys,
  handleMessageDisplay,
  volume,
  power,
}) {
  return (
    <div id="pad-container">
      {padAudioInfo.map(({ id, text, src }) => (
        <DrumPad
          key={id}
          id={id}
          text={text}
          src={src}
          pressedKeys={pressedKeys}
          setPressedKeys={setPressedKeys}
          playSound={pressedKeys[id] && power}
          handleMessageDisplay={handleMessageDisplay}
          volume={volume}
          power={power}
        />
      ))}
    </div>
  );
}

export default PadDisplay;
