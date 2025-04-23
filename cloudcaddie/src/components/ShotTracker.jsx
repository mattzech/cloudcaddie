import React, { useState } from 'react';

const clubs = ['D', '3w', '4h', '4i', '5i', '6i', '7i', '8i', '9i', 'PW', '52', '56', '60'];
const results = [
  'Left Rough', 'Right Rough', 'Fairway',
  'Short of Green', 'Long of Green', 'Left of Green',
  'Right of Green', 'On Green'
];

export default function ShotTracker() {
  const [holeNumber, setHoleNumber] = useState(1);
  const [shotNumber, setShotNumber] = useState(1);
  const [currentShot, setCurrentShot] = useState({ club: '', result: '' });
  const [putts, setPutts] = useState('');
  const [isOnGreen, setIsOnGreen] = useState(false);
  const [shots, setShots] = useState([]);

  const handleClubChange = (club) => {
    setCurrentShot((prev) => ({ ...prev, club }));
  };

  const handleResultChange = (result) => {
    setCurrentShot((prev) => ({ ...prev, result }));
  };

  const handleShotSubmit = () => {
    const shotData = {
      hole: holeNumber,
      shot: shotNumber,
      club: currentShot.club,
      result: currentShot.result
    };

    const updatedShots = [...shots, shotData];
    setShots(updatedShots);

    if (currentShot.result === 'On Green') {
      setIsOnGreen(true);
    } else {
      setShotNumber((prev) => prev + 1);
      setCurrentShot({ club: '', result: '' });
    }
  };

  const handlePuttsSubmit = () => {
    const puttData = {
      hole: holeNumber,
      putts: Number(putts)
    };

    const updatedShots = [...shots, puttData];
    setShots(updatedShots);

    // Reset for next hole
    setHoleNumber((prev) => prev + 1);
    setShotNumber(1);
    setCurrentShot({ club: '', result: '' });
    setPutts('');
    setIsOnGreen(false);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-lg mt-10">
      <h2 className="text-2xl font-bold text-green-700 text-center mb-2">
        Hole {holeNumber}
      </h2>
      <p className="text-center text-lg text-gray-600 mb-6">
        Shot {shotNumber}
      </p>


      {!isOnGreen ? (
        <div className="space-y-6">
          {/* Club Select */}
          <div>
            <label htmlFor="club" className="block text-lg font-medium text-gray-700 mb-1">
              Club Used
            </label>
            <select
              id="club"
              value={currentShot.club}
              onChange={(e) => handleClubChange(e.target.value)}
              className="w-full p-3 border rounded-lg text-lg bg-white shadow focus:outline-none focus:ring-2 focus:ring-green-600"
            >
              <option value="">Select a club</option>
              {clubs.map((club) => (
                <option key={club} value={club}>
                  {club}
                </option>
              ))}
            </select>
          </div>

          {/* Result Select */}
          <div>
            <label htmlFor="result" className="block text-lg font-medium text-gray-700 mb-1">
              Shot Result
            </label>
            <select
              id="result"
              value={currentShot.result}
              onChange={(e) => handleResultChange(e.target.value)}
              className="w-full p-3 border rounded-lg text-lg bg-white shadow focus:outline-none focus:ring-2 focus:ring-green-600"
            >
              <option value="">Select result</option>
              {results.map((res) => (
                <option key={res} value={res}>
                  {res}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleShotSubmit}
            className="w-full py-3 px-6 bg-green-600 text-white text-lg rounded-xl shadow hover:bg-green-700 transition"
          >
            Submit Shot
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <label htmlFor="putts" className="block text-lg font-medium text-gray-700">
            Number of Putts
          </label>
          <input
            type="number"
            id="putts"
            min="0"
            value={putts}
            onChange={(e) => setPutts(e.target.value)}
            className="w-full p-3 border rounded-lg text-lg bg-white shadow focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          <button
            onClick={handlePuttsSubmit}
            className="w-full py-3 px-6 bg-green-600 text-white text-lg rounded-xl shadow hover:bg-green-700 transition"
          >
            Submit Putts & Next Hole
          </button>
        </div>
      )}
    </div>
  );
}
