import React from 'react';
import logo from './logo.svg';
import './App.css';
import Mat, { useMatEditor} from './Mat';
import { useState } from 'react';


function App() {
  const [name, setName] = useState("N");
  const { addAthlete, onReady } = useMatEditor(42);
  const addAthlete2 = () => {
    const random = Math.random()*400;
    addAthlete(name, {x: random, y: random, angle: 0});
  }
  return (
    <div className="App">
      <Mat options={{ height: 500, width: 500, backgroundColor: '#7da3d3', lineColor: 'white' }} onReady={onReady} />
      <button onClick={addAthlete2}>Add Athlete</button>
      <input onChange={(v=> setName(v.currentTarget.value))} value={name} />
    </div>
  );
}

export default App;
