// Index.js
import React from 'react';
import { render } from 'react-dom';

// Import Bootstrap JS
import 'bootstrap';

// Import BootStrap and Custom Styles
import './scss/application.scss';

import App from './components/App';

render(<App />, document.getElementById('root'));
