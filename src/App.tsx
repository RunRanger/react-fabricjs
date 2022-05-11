import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Canvas } from './Canvas';

function App() {
  return (
    <div className="App">
      <Canvas height={500} width={500} />
    </div>
  );
}

export default App;
