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
  // Ref is required in order to access state inside event listener
  const pressedKeysRef = useRef(pressedKeys);

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

  // Handler for pressing power button -> power on/off
  const handlePowerChange = () => {
    const newPower = !power;
    powerRef.current = newPower;
    setPower(newPower);

    // If no power then blank display, turn off recording/playback:
    if (!newPower) {
      setDisplayMessage('');
      setRecording(false);
      setPlayBack(false);
    } else {
      // When power comes on display welcome message, reset pressed keys
      setDisplayMessage('Welcome!');
      setPressedKeys(initialKeyStates);
    }
  };

  // Handler for updating message display with message only when power on
  const handleMessageDisplay = (message) => {
    if (power) {
      setDisplayMessage(message);
    }
  };

  // Handler to update volume setting and display current volume using slider
  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    if (power) {
      setDisplayMessage(`Volume: ${newVolume}`);
    }
  };

  // Handler when pressing 'Record' button -> turn on/off recording functionality
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

  // Handler that is triggered when pads are activated during recording
  const handleRecordingUpdate = (keysPressed) => {
    const newRecordingNode = new RecordingNode(
      Date.now() - recordingStart,
      keysPressed
    );
    recordingData.next = newRecordingNode;
    setRecordingData(newRecordingNode);
  };

  // Handler that runs during playback in order to replay a recording
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

  // Handler when pressing 'PlayBack' button -> starts/stops playback of recording
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

  // Add window eventListeners for keyboard down/up when the DrumMachine mounts:
  useEffect(() => {
    const keyDownEventListener = (e) => {
      if (pressedKeysRef.current[e.code[3]] === false) {
        setPressedKeys({
          ...pressedKeysRef.current,
          [e.code[3]]: true,
        });
      }
    };

    document.addEventListener('keydown', keyDownEventListener);

    const keyUpEventListener = (e) => {
      if (pressedKeysRef.current[e.code[3]] === true) {
        setPressedKeys({
          ...pressedKeysRef.current,
          [e.code[3]]: false,
        });
      }
    };

    document.addEventListener('keyup', keyUpEventListener);

    // Return function to remove eventListener on cleanup:
    return () => {
      document.removeEventListener('keydown', keyDownEventListener);
      document.removeEventListener('keyup', keyUpEventListener);
    };
  }, []);

  // Effect to update Ref and recording data when pressed keys change
  useEffect(() => {
    // Update the pressedKeysRef to match the state of pressedKeys
    pressedKeysRef.current = pressedKeys;

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
          setDisplayMessage={setDisplayMessage}
          volume={volume}
          handleVolumeChange={handleVolumeChange}
          power={power}
          powerRef={powerRef}
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
