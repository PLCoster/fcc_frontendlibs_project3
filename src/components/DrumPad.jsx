/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/media-has-caption */
import React, { useState, useEffect, useRef } from 'react';

// Individual Drum Pad Component to activate audio on click / keypress
function DrumPad({
  id,
  src,
  text,
  pressedKeys,
  setPressedKeys,
  playSound,
  handleMessageDisplay,
  volume,
  power,
}) {
  const [hit, setHit] = useState('');

  const audioRef = useRef();

  // Helper function to play audio clip when pad is triggered
  const playClip = () => {
    // Don't play the clip if power is off
    if (power) {
      // Reset the Audio Clip if playing then play it:
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      setHit('hit');
      handleMessageDisplay(text);
    }
  };

  // Play drum pad sound when playSound prop is true, stop when false
  useEffect(() => {
    if (playSound) {
      playClip();
    } else {
      setHit('');
    }
  }, [playSound]);

  // Effect to reduce volume of drum pad audio when volume setting changes
  useEffect(() => {
    audioRef.current.volume = volume / 100;
  }, [volume]);

  return (
    <div
      id={id}
      className={`drum-pad user-select-none ${hit}`}
      role="button"
      onMouseDown={() => setPressedKeys({ ...pressedKeys, [id]: true })}
      onMouseUp={() => setPressedKeys({ ...pressedKeys, [id]: false })}
      onMouseLeave={() => setPressedKeys({ ...pressedKeys, [id]: false })}
      tabIndex={0}
    >
      {id}
      {/* TO PASS FCC TESTS NEED TO RENDER AN AUDIO ELEMENT - ACCESS VIA REF */}
      <audio
        ref={audioRef}
        id={id}
        className="clip"
        src={src}
        onEnded={(e) => {
          e.target.currentTime = 0;
        }}
      />
    </div>
  );
}

export default DrumPad;
