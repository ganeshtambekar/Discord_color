import React, { useState } from 'react';
import './App.css';

const FOREGROUND_COLORS = [
  'red', 'lime', 'yellow', 'cyan', 'magenta', 'green', 'white'
];

const BACKGROUND_COLORS = [
  'navy', 'orange', 'gray', 'darkgray', 'lightgray', 'purple', 'silver', 'beige'
];

function App() {
  const [text, setText] = useState('');
  const [coloredSegments, setColoredSegments] = useState([]);
  const [selectedFG, setSelectedFG] = useState(null);
  const [selectedBG, setSelectedBG] = useState(null);

  const addColoredSegment = () => {
    if (selectedFG || selectedBG) {
      const newSegment = {
        text: text.slice(coloredSegments.reduce((acc, seg) => acc + seg.text.length, 0)),
        fg: selectedFG,
        bg: selectedBG
      };
      setColoredSegments([...coloredSegments, newSegment]);
      setSelectedFG(null);
      setSelectedBG(null);
    }
  };

  const resetAll = () => {
    setText('');
    setColoredSegments([]);
    setSelectedFG(null);
    setSelectedBG(null);
  };

  const generateDiscordMarkdown = () => {
    return coloredSegments.map(seg => {
      let markdown = seg.text;
      if (seg.fg) markdown = `\`\`ansi\n\u001b[${seg.fg}m${markdown}\u001b[0m\`\``;
      return markdown;
    }).join(' ');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateDiscordMarkdown());
    alert('Copied to clipboard!');
  };

  return (
    <div className="App">
      <h1>Discord Colored Text Generator</h1>
      
      <div className="description">
        <p>This is a simple app that creates colored Discord messages using ANSI color codes.</p>
        <p>Write your text, select parts of it, assign colors, and send in a Discord message.</p>
      </div>

      <textarea 
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your text here..."
      />

      <div className="color-selectors">
        <div className="fg-colors">
          <label>Foreground (Text) Colors:</label>
          {FOREGROUND_COLORS.map(color => (
            <button 
              key={color} 
              style={{backgroundColor: color}}
              className={selectedFG === color ? 'selected' : ''}
              onClick={() => setSelectedFG(color === selectedFG ? null : color)}
            />
          ))}
        </div>

        <div className="bg-colors">
          <label>Background Colors:</label>
          {BACKGROUND_COLORS.map(color => (
            <button 
              key={color} 
              style={{backgroundColor: color}}
              className={selectedBG === color ? 'selected' : ''}
              onClick={() => setSelectedBG(color === selectedBG ? null : color)}
            />
          ))}
        </div>
      </div>

      <div className="actions">
        <button onClick={addColoredSegment}>Add Colored Segment</button>
        <button onClick={resetAll}>Reset All</button>
        <button onClick={copyToClipboard}>Copy to Clipboard</button>
      </div>

      <div className="preview">
        <h3>Preview:</h3>
        {coloredSegments.map((seg, index) => (
          <span 
            key={index} 
            style={{
              color: seg.fg || 'inherit', 
              backgroundColor: seg.bg || 'inherit'
            }}
          >
            {seg.text}
          </span>
        ))}
      </div>
    </div>
  );
}

export default App;