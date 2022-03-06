import React from 'react';

import NavBar from './NavBar';
import DrumMachine from './DrumMachine';

function App() {
  return (
    <>
      <NavBar />
      <div id="app-container" className="container">
        <div className="flex-grow" />
        <DrumMachine />
        <div className="flex-grow" />
      </div>
    </>
  );
}

export default App;
