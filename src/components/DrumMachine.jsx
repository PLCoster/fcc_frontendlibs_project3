import React from 'react';

import PadDisplay from './PadDisplay';
import ControlsDisplay from './ControlsDisplay';

function DrumMachine() {
  return (
    <div id="drum-machine" className="text-light text-center p-3">
      <h4 className="logo">Free Drummer</h4>
      <div className="drum-machine-container">
        <ControlsDisplay />
        <PadDisplay />
      </div>
    </div>
  );
}

export default DrumMachine;
