import React from 'react';
import logo from './logo.svg';
import './App.css';
import Canvas, { useMatEditor} from './Canvas';
import { useState } from 'react';

function App() {
  const [name, setName] = useState("N");
  const { addRectAngle, onReady } = useMatEditor();
  const addAthlete = () => {
    addRectAngle(name);
  }
  return (
    <div className="App">
      <Canvas height={500} width={500} onReady={onReady} />
      <button onClick={addAthlete}>Add Athlete</button>
      <input onChange={(v=> setName(v.currentTarget.value))} value={name} />
    </div>
  );
}

export default App;
