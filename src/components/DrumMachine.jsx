import React, { useEffect, useState, useRef } from 'react';

import PadDisplay from './PadDisplay';
import ControlsDisplay from './ControlsDisplay';

// LL DS to hold recording details as changes in key presses over time
class RecordingNode {
  constructor(timestamp, keys) {
    this.timestamp = timestamp;
    this.keys = keys;
    this.next = null;
  }
}

const initialKeyStates = {
  Q: false,
  W: false,
  E: false,
  A: false,
  S: false,
  D: false,
  Z: false,
  X: false,
  C: false,
};

function DrumMachine() {
  const [pressedKeys, setPressedKeys] = useState(initialKeyStates);

  const [power, setPower] = useState(true);
  const powerRef = useRef(true);

  const [displayMessage, setDisplayMessage] = useState('Welcome!');

  const [volume, setVolume] = useState(100);

  const [recording, setRecording] = useState(false);
  const [recordingStart, setRecordingStart] = useState(0);
  const [recordingDataHead, setRecordingDataHead] = useState(null);
  const [recordingData, setRecordingData] = useState(null);

  const [playBack, setPlayBack] = useState(false);
  const playBackStartRef = useRef(0);
  const playBackRef = useRef(false);
  const playBackDataRef = useRef(null);

  const handlePowerChange = () => {
    const newPower = !power;
    powerRef.current = newPower;
    setPower(newPower);

    // If no power then blank display:
    if (!newPower) {
      setDisplayMessage('');
      setRecording(false);
      setPlayBack(false);
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

  const handleRecordingChange = () => {
    if (power) {
      const newRecording = !recording;
      setRecording(newRecording);
      if (newRecording) {
        setDisplayMessage('Recording...');
        setRecordingStart(Date.now());
        const recordingHead = new RecordingNode(0, initialKeyStates);
        setRecordingDataHead(recordingHead);
        setRecordingData(recordingHead);
      } else {
        setDisplayMessage('Recording Done');
      }
    }
  };

  const handleRecordingUpdate = (keysPressed) => {
    const newRecordingNode = new RecordingNode(
      Date.now() - recordingStart,
      keysPressed
    );
    recordingData.next = newRecordingNode;
    setRecordingData(newRecordingNode);
  };

  const handlePlayBack = () => {
    // Only continue to play if playback button still on and powered
    // Refs need to be used here since setTimeOut does not have hook access
    if (powerRef.current && playBackRef.current && playBackDataRef.current) {
      const currTime = Date.now() - playBackStartRef.current;
      const currNode = playBackDataRef.current;

      if (currNode.timestamp <= currTime) {
        setPressedKeys(currNode.keys);
        playBackDataRef.current = currNode.next;
      }

      // Timeout to handle next node
      setTimeout(handlePlayBack, 1);
    } else {
      // If end of track is reached / power turned off / playback stopped
      playBackRef.current = false;
      setPlayBack(false);
    }
  };

  const handlePlayBackChange = () => {
    if (!recordingStart) {
      setDisplayMessage('No Recordings');
      return;
    }
    // Set playback and playback start time:
    const newPlayBack = !playBack;
    playBackRef.current = newPlayBack;
    setPlayBack(newPlayBack);

    if (newPlayBack && recordingDataHead) {
      playBackStartRef.current = Date.now();
      playBackDataRef.current = recordingDataHead;
      setTimeout(handlePlayBack, 1);
    }
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

  // Effect to update recording data when pressed keys change
  useEffect(() => {
    if (recording) {
      handleRecordingUpdate(pressedKeys);
    }
  }, [pressedKeys]);

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
          recording={recording}
          handleRecordingChange={handleRecordingChange}
          playBack={playBack}
          handlePlayBackChange={handlePlayBackChange}
        />
        <PadDisplay
          pressedKeys={pressedKeys}
          setPressedKeys={setPressedKeys}
          handleMessageDisplay={handleMessageDisplay}
          volume={volume}
          power={power}
        />
      </div>
    </div>
  );
}

export default DrumMachine;
