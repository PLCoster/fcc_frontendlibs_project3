import React from 'react';

function DrumPad({ id, src, text }) {
  console.log(src);
  const audio = new Audio(src);

  const playAudio = () => {
    // Reset the Audio Clip if playing then play it:
    audio.load();
    audio.play();
  };

  return (
    <div id={id} className="drum-pad" onClick={playAudio}>
      {text}
    </div>
  );
}

export default DrumPad;
