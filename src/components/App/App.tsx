import React from 'react';
import './App.css';
import { Board } from '../Board/Board';

function App() {

  const defaultRows = 6;
  const defaultColumns = 7;

  return (
    <div className="App">
      <Board rows={defaultRows} cols={defaultColumns}></Board>
    </div>
  );
}

export default App;
