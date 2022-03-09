# Free Code Camp: Front End Libs Project 3 - Drum Machine

## React Drum Machine

### Project Aims:

The aim of this project was to build a drum machine with functionality similar to https://codepen.io/freeCodeCamp/full/MJyNMd.

This project was built using the following technologies:

- **HTML**
- **JavaScript** with **[Node.js](https://nodejs.org/en/) / [NPM](https://www.npmjs.com/)** for package management
- **[React](https://reactjs.org/)** for application view with React Hooks to handle the application state
- **[Bootstrap](https://getbootstrap.com/)** for styling with some custom **SASS / SCSS**
- **[FontAwesome](https://fontawesome.com/)** for icons
- **[webpack](https://webpack.js.org/)** to bundle React / JS / Styles and development server

Drum Samples were provided by **[SampleSwap](https://sampleswap.org/)**

### Project Requirements:

- User Story #1: I should be able to see an outer container with a corresponding id="drum-machine" that contains all other elements.

- User Story #2: Within #drum-machine I can see an element with a corresponding id="display".

- User Story #3: Within #drum-machine I can see 9 clickable drum pad elements, each with a class name of drum-pad, a unique id that describes the audio clip the drum pad will be set up to trigger, and an inner text that corresponds to one of the following keys on the keyboard: Q, W, E, A, S, D, Z, X, C. The drum pads MUST be in this order.

- User Story #4: Within each .drum-pad, there should be an HTML5 audio element which has a src attribute pointing to an audio clip, a class name of clip, and an id corresponding to the inner text of its parent .drum-pad (e.g. id="Q", id="W", id="E" etc.).

- User Story #5: When I click on a .drum-pad element, the audio clip contained in its child audio element should be triggered.

- User Story #6: When I press the trigger key associated with each .drum-pad, the audio clip contained in its child audio element should be triggered (e.g. pressing the Q key should trigger the drum pad which contains the string Q, pressing the W key should trigger the drum pad which contains the string W, etc.).

- User Story #7: When a .drum-pad is triggered, a string describing the associated audio clip is displayed as the inner text of the #display element (each string must be unique).

### Project Writeup:

For the third Free Code Camp: Front End Libraries Project, I decided to build the project using the React Library, and use webpack to bundle all the React / JS code into a single minified and uglified bundle. The application state is controlled using React Hooks (`useState`, `useEffect`, `useRef`).

Going beyone the required User Stories outlined above, this React Drum Machine also allows users to record their drum pad inputs, and then replay the inputs at a later time (Record / Playback functionality). Furthermore, users can then use the Playback + Record functionality in order to layer recordings and inputs on top of each other, building up complex drum tracks over time.

The output volume of triggered sounds can be adjusted using a volume slider on the drum machine.
In addition, the drum machine has a metronome functionality, allowing users to play an audible metronome with a specified tempo (50 - 250 bpm) that can be adjusted using the corresponding slider.

Finally the drum machine can have its power turned on / off, following the logic of a physical drum machine. The drum machine remembers recorded drum tracks even when switched off, and they can be replayed when switched back on.

### Project Files

- `index.html` - is a simple HTML template to mount the React component tree. Webpack adds the scripts required to load the JS bundle when the project is built.

- `index.jsx` - this the entry point to the React application, it renders the react component tree on the DOM, as well as imports styles for the application. It is also the file the webpack uses as its entry point to create the JS bundle.

- `assets/` - this folder contains audio clips and font files for the application, as well as a JS file (`audioLoader.js`) to combine all the audioclip information into a single array.

#### Components

- `App.jsx` is a simple container component for the `NavBar` and `DrumMachine` Components:

  - `NavBar.jsx` is a presentational navbar component, providing links to other projects / sites.

  - `DrumMachine.jsx` is a major stateful component of the application. It contains various state variables (`pressedKeys, power, displayMessage, volume, recording, playBack`) as well as various handler functions to update state in a logical manner, when events are triggered in the app. This component also initialises document event listeners to listen for 'keydown' and 'keyup' events in order to trigger the drum pads on certain key presses. Both state variables and handler functions are passed to its child components (`ControlsDisplay` and `PadDisplay`) as props:

    - `ControlsDisplay.jsx` is the component responsible for displaying the control panel (visual display, volume and tempo sliders, Record / PlayBack / PlayBack + Record / Metronome and Power buttons) on the LHS of the drum machine. It is also a stateful component as it controls the state of the metronome (on/off) and the metronome `tempo`.

    - `PadDisplay.jsx` is a container component for the nine drum pad inputs on the RHS of the drum machine. It renders nine `DrumPad` components using the JS map higher order function, applied to an array of drum pad information / audioClip sources from `audioLoader.js`. Props are passed to each DrumPad to correctly label / identify them as well as determine whether or not they should play their audio clip at a given time.

      - `DrumPad.jsx` creates individual `DrumPad` components. Each one holds an audio clip which can be triggered to play when the `playSound` prop passed to it is truthy. `DrumPad`s can be triggered by the correct key press or by a mouse click. `DrumPad`s also adjust their audioclip volume when the `volume` prop passed to them changes, which occurs when the volume slider is altered.

### Usage

Requires Node.js / NPM in order to install required packages. After downloading the repo, install required dependencies with:

`npm install`

The webpack development server can then be started with:

`npm run dev`

The development server can then be viewed at `http://localhost:8080/` in the browser.

A production build can be created in the `dist/` folder by running:

`npm run build`

To view the production build, open the output html file in the dist folder in your browser, or serve it using Live Server in VSCode.
