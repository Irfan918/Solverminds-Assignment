import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [zoomLevel, setZoomLevel] = useState(1.0);

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
    const padding = 5; // Padding around symbols
    const margin = 5; // Margin from the square line

    const symbols = ['▲', '®', '°', '⭕'];

    function drawCanvas(context, zoom) {
      context.clearRect(0, 0, canvas1.width, canvas1.height);
      context.save();
      context.scale(zoom, zoom);

      for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
          const x = col * boxSize;
          const y = row * boxSize;
          const symbolIndex = col === 0 ? 0 : col === numCols - 1 ? 3 : (col % 2) + 1;
          const symbol = symbols[symbolIndex];

          context.strokeStyle = 'black';
          context.strokeRect(x, y, boxSize, boxSize);
          context.font = `${symbolSize}px sans-serif`;
          context.textBaseline = 'middle';
          context.textAlign = 'center';

          if (row === 0 && col === 1) {
            // Draw all symbols in the specified square (0,1)
            const centerX = x + boxSize / 2;
            const centerY = y + boxSize / 2;

            // Draw corner symbols with padding and margin
            const smallSymbolSize = 12;
            context.font = `${smallSymbolSize}px sans-serif`;

            // Draw '$' on the top left
            context.fillText('$', x + margin, y + margin + smallSymbolSize);

            // Draw 'RE' at the bottom left
            context.fillText('RE', x + margin + padding, y + boxSize - margin - padding - smallSymbolSize);

            // Draw '*' between '$' and 'RE'
            context.fillText('*', x + margin + smallSymbolSize + padding / 2, y + margin + smallSymbolSize + padding);

            // Draw '*' on the bottom right
            context.fillText('*', x + boxSize - margin - padding, y + boxSize - margin - padding);

            // Draw center number
            context.font = '14px sans-serif';
            context.fillText('1', centerX, centerY);
          } else if ((row === 0 && col === 2) || (row === 1 && (col === 1 || col === 2))) {
            // Clear the content while keeping the outline
            context.clearRect(x + 1, y + 1, boxSize - 2, boxSize - 2);
          } else {
            // Skip drawing for other squares
            context.fillText(symbol, x + boxSize / 2, y + boxSize / 2);
          }
        }
      }

      context.restore();
    }

    drawCanvas(ctx1, zoomLevel);
    drawCanvas(ctx2, zoomLevel);
    drawCanvas(ctx3, zoomLevel);
  }, [zoomLevel]);

  const handleZoomIn = () => {
    setZoomLevel(Math.min(2.0, zoomLevel + 0.1)); // Adjust the maximum zoom level as needed
  };

  const handleZoomOut = () => {
    setZoomLevel(Math.max(0.5, zoomLevel - 0.1)); // Adjust the minimum zoom level as needed
  };

  return (
    <div className="App">
      <div className="zoom-controls">
        <button onClick={handleZoomIn}>Zoom In</button>
        <button onClick={handleZoomOut}>Zoom Out</button>
      </div>
      <div className="canvas-container">
        <canvas id="canvas1" className="canvas" width={4 * 50 * zoomLevel} height={9 * 50 * zoomLevel}></canvas>
        <canvas id="canvas2" className="canvas" width={4 * 50 * zoomLevel} height={9 * 50 * zoomLevel}></canvas>
        <canvas id="canvas3" className="canvas" width={4 * 50 * zoomLevel} height={9 * 50 * zoomLevel}></canvas>
      </div>
    </div>
  );
}

export default App;
