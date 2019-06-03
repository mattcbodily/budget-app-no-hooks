import React from 'react';
import {HashRouter} from 'react-router-dom';
import routes from './routes';
import Header from './Components/Header/Header';
import './App.css';

function App() {
  return (
    <div className="App">
      <HashRouter>
          {routes}
      </HashRouter>
    </div>
  );
}

export default App;
