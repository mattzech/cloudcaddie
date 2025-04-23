import React, { useState, useEffect } from 'react';

const resultOptions = [
  'Left Rough',
  'Right Rough',
  'Fairway',
  'Short of Green',
  'Long of Green',
  'Left of Green',
  'Right of Green',
  'On Green',
];

const clubOptions = [
    "Driver", "3W", "4H", "4I", "5I", "6I", "7I", "8I", "9I", "PW", "52", "56", "60"
  ];

  const ShotTracker = () => {
    const [currentHole, setCurrentHole] = useState(1);
    const [shotNumber, setShotNumber] = useState(1);
    const [shots, setShots] = useState([]);
    const [isOnGreen, setIsOnGreen] = useState(false);
    const [putts, setPutts] = useState('');
    const [roundData, setRoundData] = useState([]);
  
    const handleShotSubmit = (e) => {
      e.preventDefault();
      const club = e.target.club.value;
      const result = e.target.result.value;
  
      const newShot = {
        shotNumber,
        club,
        result,
      };
  
      const updatedShots = [...shots, newShot];
      setShots(updatedShots);
  
      if (result === 'On Green') {
        setIsOnGreen(true);
      } else {
        setShotNumber(shotNumber + 1);
      }
  
      e.target.reset();
    };
  
    const handlePuttsSubmit = (e) => {
      e.preventDefault();
      const holeData = {
        hole: currentHole,
        shots: shots,
        putts: Number(putts),
      };
  
      setRoundData([...roundData, holeData]);
  
      // Reset for next hole
      setCurrentHole(currentHole + 1);
      setShotNumber(1);
      setShots([]);
      setIsOnGreen(false);
      setPutts('');
    };
  
    return (
      <div style={{ maxWidth: '400px', margin: 'auto' }}>
        <h2>Hole {currentHole}</h2>
  
        {!isOnGreen ? (
          <form onSubmit={handleShotSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Club Used</label>
            <select name="club" required className="w-full p-2 rounded border border-gray-300">
              {clubOptions.map((club) => (
                <option key={club} value={club}>{club}</option>
              ))}
            </select>
          </div>
        
          <div>
            <label className="block text-sm font-medium text-gray-700">Shot Result</label>
            <select name="result" required className="w-full p-2 rounded border border-gray-300">
              {resultOptions.map((res) => (
                <option key={res} value={res}>{res}</option>
              ))}
            </select>
          </div>
        
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded text-lg hover:bg-green-700"
          >
            Submit Shot
          </button>
        </form>
        
        ) : (
          <form onSubmit={handlePuttsSubmit}>
            <label>
              Number of Putts:
              <input
                type="number"
                value={putts}
                onChange={(e) => setPutts(e.target.value)}
                min="0"
                required
              />
            </label>
            <br />
            <button type="submit">Submit Hole</button>
          </form>
        )}
  
        <hr />
        <h3>Shots This Hole:</h3>
        <ul>
          {shots.map((shot, idx) => (
            <li key={idx}>
              Shot {shot.shotNumber}: {shot.club}, {shot.result}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default ShotTracker;