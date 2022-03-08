import React from 'react';

function ControlsDisplay({ displayMessage, setDisplayMessage }) {
  return (
    <div id="controls-container">
      <div id="display">{displayMessage}</div>
    </div>
  );
}

export default ControlsDisplay;
