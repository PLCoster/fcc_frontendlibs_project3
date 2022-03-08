import React from 'react';

function ControlsDisplay({ displayMessage, volume, handleVolumeChange }) {
  return (
    <div id="controls-container">
      <div id="display">{displayMessage}</div>
      <div>
        Test <i className="fa-solid fa-volume-low" />
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
