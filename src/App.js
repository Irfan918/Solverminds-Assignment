import React, { useEffect } from 'react';
import './App.css';

function App() {
  useEffect(() => {
    const canvas1 = document.getElementById('canvas1');
    const ctx1 = canvas1.getContext('2d');

    const canvas2 = document.getElementById('canvas2');
    const ctx2 = canvas2.getContext('2d');

    const canvas3 = document.getElementById('canvas3');
    const ctx3 = canvas3.getContext('2d');

    const numRows = 9;
    const numCols = 4;
    const boxSize = 50;
    const symbolSize = 20;

    const symbols = ['▲', '®', '°', '⭕'];

    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        const x = col * boxSize;
        const y = row * boxSize;
        const symbolIndex = col === 0 ? 0 : col === numCols - 1 ? 3 : (col % 2) + 1;
        const symbol = symbols[symbolIndex];

        ctx1.strokeStyle = 'black';
        ctx1.strokeRect(x, y, boxSize, boxSize);
        ctx1.font = `${symbolSize}px sans-serif`;
        ctx1.textBaseline = 'middle';
        ctx1.textAlign = 'center';
        ctx1.fillText(symbol, x + boxSize / 2, y + boxSize / 2);

        ctx2.strokeStyle = 'black';
        ctx2.strokeRect(x, y, boxSize, boxSize);
        ctx2.font = `${symbolSize}px sans-serif`;
        ctx2.textBaseline = 'middle';
        ctx2.textAlign = 'center';
        ctx2.fillText(symbol, x + boxSize / 2, y + boxSize / 2);

        ctx3.strokeStyle = 'black';
        ctx3.strokeRect(x, y, boxSize, boxSize);
        ctx3.font = `${symbolSize}px sans-serif`;
        ctx3.textBaseline = 'middle';
        ctx3.textAlign = 'center';
        ctx3.fillText(symbol, x + boxSize / 2, y + boxSize / 2);
      }
    }
  }, []);

  return (
    <div className="App">
      
      <div className="canvas-container">
        <canvas id="canvas1" className="canvas" width={4 * 50} height={9 * 50}></canvas>
        <canvas id="canvas2" className="canvas" width={4 * 50} height={9 * 50}></canvas>
        <canvas id="canvas3" className="canvas" width={4 * 50} height={9 * 50}></canvas>
      </div>
    </div>
  );
}

export default App;
