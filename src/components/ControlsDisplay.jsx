import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeLow, faVolumeHigh } from '@fortawesome/free-solid-svg-icons';

function ControlsDisplay({
  displayMessage,
  volume,
  handleVolumeChange,
  power,
  handlePowerChange,
  recording,
  handleRecordingChange,
  playBack,
  handlePlayBackChange,
}) {
  return (
    <div id="controls-container">
      <div id="display" className={`${power ? 'active' : ''}`}>
        {displayMessage}
      </div>
      <div className="mt-5">
        <FontAwesomeIcon icon={faVolumeLow} className="vol-icon" />
        <input
          id="volume-control"
          type="range"
          min="0"
          max="100"
          onChange={(e) => handleVolumeChange(e.target.value)}
          value={volume}
          aria-label="volume"
        />
        <FontAwesomeIcon icon={faVolumeHigh} className="vol-icon" />
      </div>
      <div id="control-buttons" className="mt-3">
        <div>
          <div
            role="button"
            className={`control-button ${
              power && recording ? 'active' : ''
            } m-3`}
            tabIndex={0}
            onClick={handleRecordingChange}
            aria-label="Start/Stop Recording"
          >
            Record
          </div>
          <div
            role="button"
            className={`control-button ${
              power && playBack ? 'active' : ''
            } m-3`}
            tabIndex={0}
            onClick={handlePlayBackChange}
            aria-label="Start/Stop Recording"
          >
            PlayBack
          </div>
          <div
            role="button"
            className={`control-button ${power ? 'active' : ''} m-3 mt-4`}
            tabIndex={0}
            onClick={handlePowerChange}
            aria-label="Power On/Off"
          >
            Power
          </div>
        </div>
      </div>
    </div>
  );
}

export default ControlsDisplay;
