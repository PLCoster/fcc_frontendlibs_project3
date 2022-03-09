/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React, { useState, useRef, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faVolumeLow,
  faVolumeHigh,
  faGauge,
  faGaugeHigh,
} from '@fortawesome/free-solid-svg-icons';

import metronomeClip from '../assets/audio/808-claves.mp3';

// Displays all controls in LHS of Drum Machine
function ControlsDisplay({
  displayMessage,
  setDisplayMessage,
  volume,
  handleVolumeChange,
  power,
  powerRef,
  handlePowerChange,
  recording,
  handleRecordingChange,
  playBack,
  handlePlayBackChange,
}) {
  const [tempo, setTempo] = useState(100);
  const [metronomeState, setMetronomeState] = useState(false);

  const tempoRef = useRef(100);
  const metronomeStateRef = useRef(false);
  const metronomeTimeRef = useRef(0);

  const metronomeAudio = new Audio(metronomeClip);

  // Handler for altering tempo slider
  const handleTempoChange = (newTempo) => {
    tempoRef.current = newTempo;
    setTempo(newTempo);
    if (power) {
      setDisplayMessage(`BPM: ${newTempo}`);
    }
  };

  // Helper function that runs metronome as long as button and power is on
  const runMetronome = () => {
    if (powerRef.current && metronomeStateRef.current) {
      const timeDiff = (1000 * 60) / tempoRef.current;
      const currTime = Date.now();
      if (currTime - metronomeTimeRef.current >= timeDiff) {
        metronomeAudio.load();
        metronomeAudio.play();
        metronomeTimeRef.current = currTime;
      }
      setTimeout(runMetronome, 1);
    }
  };

  // Handler when metronome button is clicked -> Metronome on/off
  const handleMetronomeChange = () => {
    const newMetroState = !metronomeState;
    metronomeStateRef.current = newMetroState;
    setMetronomeState(newMetroState);
  };

  // Effect to play metronome audio when button pressed
  useEffect(() => {
    if (power && metronomeState) {
      setDisplayMessage('Metronome ON');
      metronomeTimeRef.current = Date.now();
      runMetronome();
    } else if (power && displayMessage !== 'Welcome!') {
      // Update display when metronome is switched off
      setDisplayMessage('Metronome OFF');
    } else if (metronomeState) {
      // If power is off and metronome is on, turn it off
      handleMetronomeChange();
    }
  }, [metronomeState, power]);

  return (
    <div id="controls-container">
      {/* DRUM MACHINE LCD DISPLAY */}
      <div id="display" className={`${power ? 'active' : ''}`}>
        {displayMessage}
      </div>

      {/* VOLUME SLIDER */}
      <div className="mt-3">
        <FontAwesomeIcon icon={faVolumeLow} className="vol-icon" />
        <input
          className="slider-control"
          type="range"
          min="0"
          max="100"
          onChange={(e) => handleVolumeChange(e.target.value)}
          value={volume}
          aria-label="Volume Control"
        />
        <FontAwesomeIcon icon={faVolumeHigh} className="vol-icon" />
      </div>

      {/* METRONOME SLIDER */}
      <div className="mt-3">
        <FontAwesomeIcon icon={faGauge} className="vol-icon" />
        <input
          className="slider-control"
          type="range"
          min="50"
          max="250"
          onChange={(e) => handleTempoChange(e.target.value)}
          value={tempo}
          aria-label="Metronome Tempo Control"
        />
        <FontAwesomeIcon icon={faGaugeHigh} className="vol-icon" />
      </div>

      {/* BUTTONS */}
      <div id="control-buttons" className="mt-2">
        <div
          role="button"
          className={`control-button ${
            power && recording ? 'active' : ''
          } mt-2`}
          tabIndex={0}
          onClick={handleRecordingChange}
          aria-label="Start/Stop Recording"
        >
          Record
        </div>
        <div
          role="button"
          className={`control-button ${power && playBack ? 'active' : ''} mt-2`}
          tabIndex={0}
          onClick={handlePlayBackChange}
          aria-label="Start/Stop Recording"
        >
          PlayBack
        </div>
        <div
          role="button"
          className={`control-button ${
            power && playBack && recording ? 'active' : ''
          } mt-2`}
          tabIndex={0}
          onClick={() => {
            handlePlayBackChange();
            handleRecordingChange();
          }}
          aria-label="Start/Stop PlayBack and Recording"
        >
          PB + Rec
        </div>
        <div
          role="button"
          className={`control-button ${
            power && metronomeState ? 'active' : ''
          } mt-2`}
          tabIndex={0}
          onClick={handleMetronomeChange}
          aria-label="Start/Stop Metronome"
        >
          <small>Metronome</small>
        </div>
        <div
          role="button"
          className={`control-button ${power ? 'active' : ''} mt-4`}
          tabIndex={0}
          onClick={handlePowerChange}
          aria-label="Power On/Off"
        >
          Power
        </div>
      </div>
    </div>
  );
}

export default ControlsDisplay;
