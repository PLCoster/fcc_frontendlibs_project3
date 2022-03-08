import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

function ControlsDisplay({ displayMessage, volume, handleVolumeChange }) {
  return (
    <div id="controls-container">
      <div id="display">{displayMessage}</div>
      <div>
        Test <FontAwesomeIcon icon={faCoffee} />
        <input
          id="volume-control"
          className="mt-5"
          type="range"
          min="0"
          max="100"
          onChange={(e) => handleVolumeChange(e.target.value)}
          value={volume}
          aria-label="volume"
        />
        <i class="fas fa-volume-up"></i>
      </div>
      <i class="fas fa-volume-up"></i>
    </div>
  );
}

export default ControlsDisplay;
