import React from 'react';

import NavBar from './NavBar';
import DrumMachine from './DrumMachine';

function App() {
  return (
    <>
      <NavBar />
      <div id="app-container" className="container">
        <DrumMachine />
      </div>
    </>
  );
}

export default App;
