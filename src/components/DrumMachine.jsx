import React, { useEffect, useState, useRef } from 'react';

import PadDisplay from './PadDisplay';
import ControlsDisplay from './ControlsDisplay';

function DrumMachine() {
  const [pressedKeys, setPressedKeys] = useState({
    Q: false,
    W: false,
    E: false,
    A: false,
    S: false,
    D: false,
    Z: false,
    X: false,
    C: false,
  });

  const [power, setPower] = useState(true);
  const [displayMessage, setDisplayMessage] = useState('Welcome!');
  const [volume, setVolume] = useState(100);

  const handlePowerChange = () => {
    const newPower = !power;
    setPower(newPower);

    // If no power then blank display:
    if (!newPower) {
      setDisplayMessage('');
    } else {
      setDisplayMessage('Welcome!');
    }
  };

  const handleMessageDisplay = (message) => {
    if (power) {
      setDisplayMessage(message);
    }
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    setDisplayMessage(`Volume: ${newVolume}`);
  };

  // Ref is required in order to access state inside event listener
  const pressedKeysRef = useRef(pressedKeys);

  // Add eventListeners for keyboard down/up when the DrumMachine mounts:
  useEffect(() => {
    const keyDownEventListener = (e) => {
      if (pressedKeysRef.current[e.code[3]] === false) {
        pressedKeysRef.current = {
          ...pressedKeysRef.current,
          [e.code[3]]: true,
        };
        setPressedKeys(pressedKeysRef.current);
      }
    };

    document.addEventListener('keydown', keyDownEventListener);

    const keyUpEventListener = (e) => {
      if (pressedKeysRef.current[e.code[3]] === true) {
        pressedKeysRef.current = {
          ...pressedKeysRef.current,
          [e.code[3]]: false,
        };
        setPressedKeys(pressedKeysRef.current);
      }
    };

    document.addEventListener('keyup', keyUpEventListener);

    // Return function to remove eventListener on cleanup:
    return () => {
      document.removeEventListener('keydown', keyDownEventListener);
      document.removeEventListener('keyup', keyUpEventListener);
    };
  }, []);

  return (
    <div id="drum-machine" className="text-light text-center mt-5 p-3">
      <h4 className="logo">Free Drummer</h4>
      <div className="drum-machine-container">
        <ControlsDisplay
          displayMessage={displayMessage}
          volume={volume}
          handleVolumeChange={handleVolumeChange}
          power={power}
          handlePowerChange={handlePowerChange}
        />
        <PadDisplay
          pressedKeys={pressedKeys}
          handleMessageDisplay={handleMessageDisplay}
          volume={volume}
          power={power}
        />
      </div>
    </div>
  );
}

export default DrumMachine;
