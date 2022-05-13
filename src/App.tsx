import React from 'react';
import logo from './logo.svg';
import './App.css';
import Canvas, { useMatEditor} from './Canvas';

function App() {
  const { addRectAngle, onReady } = useMatEditor();
  const addAthlete = () => {
    addRectAngle();
  }
  return (
    <div className="App">
      <Canvas height={500} width={500} onReady={onReady} />
      <button onClick={addAthlete}>Add Athlete</button>
    </div>
  );
}

export default App;
