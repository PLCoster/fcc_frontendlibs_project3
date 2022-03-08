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

  const [displayMessage, setDisplayMessage] = useState('');
  const [volume, setVolume] = useState(100);

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
        />
        <PadDisplay
          pressedKeys={pressedKeys}
          setDisplayMessage={setDisplayMessage}
          volume={volume}
        />
      </div>
    </div>
  );
}

export default DrumMachine;
