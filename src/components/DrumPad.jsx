/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/media-has-caption */
import React, { useState, useEffect, useRef } from 'react';

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

  const playClip = () => {
    // Don't play the clip if power is off
    if (power) {
      // Reset the Audio Clip if playing then play it:
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      console.log(audioRef.current.volume);
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

  useEffect(() => {
    audioRef.current.volume = volume / 100;
    console.log('seting volume to: ', audioRef.current.volume);
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
      {/* TO PASS FCC TESTS NEED TO RENDER AN AUDIO ELEMENT */}
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
