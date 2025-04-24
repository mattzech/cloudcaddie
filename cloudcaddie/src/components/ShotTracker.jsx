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
  const [useGeolocation, setUseGeolocation] = useState(false);
  const [hasStartedHole, setHasStartedHole] = useState(false);
  const [teeLocation, setTeeLocation] = useState(null);
  const [previousLocation, setPreviousLocation] = useState(null);



  const handleClubChange = (club) => {
    setCurrentShot((prev) => ({ ...prev, club }));
  };

  const handleResultChange = (result) => {
    setCurrentShot((prev) => ({ ...prev, result }));
  };

  const handleShotSubmit = () => {
    if (useGeolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords;
        const currentLocation = { lat: latitude, lon: longitude };
  
        let distance = null;
        if (previousLocation) {
          distance = calculateDistance(previousLocation, currentLocation);
        }
  
        const shotData = {
          hole: holeNumber,
          shot: shotNumber,
          club: currentShot.club,
          result: currentShot.result,
          location: currentLocation,
          distance: distance
        };
  
        setShots((prev) => [...prev, shotData]);
        setPreviousLocation(currentLocation);
  
        if (currentShot.result === 'On Green') {
          setIsOnGreen(true);
        } else {
          setShotNumber((prev) => prev + 1);
          setCurrentShot({ club: '', result: '' });
        }
      });
    } else {
      const shotData = {
        hole: holeNumber,
        shot: shotNumber,
        club: currentShot.club,
        result: currentShot.result
      };
  
      setShots((prev) => [...prev, shotData]);
  
      if (currentShot.result === 'On Green') {
        setIsOnGreen(true);
      } else {
        setShotNumber((prev) => prev + 1);
        setCurrentShot({ club: '', result: '' });
      }
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
    setHasStartedHole(false);
    setTeeLocation(null);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-lg mt-10">
      <h2 className="text-2xl font-bold text-green-700 text-center mb-2">
        Hole {holeNumber}
      </h2>
      <p className="text-center text-lg text-gray-600 mb-6">
        Shot {shotNumber}
      </p>

      {/* Toggle GPS */}
      <div className="flex items-center space-x-3 mb-4">
        <span className="text-gray-700 text-lg">GPS Tracking</span>
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={useGeolocation}
            onChange={(e) => setUseGeolocation(e.target.checked)}
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-green-500 rounded-full peer peer-checked:bg-green-600 relative">
            <div className="absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full transition-all peer-checked:translate-x-full"></div>
          </div>
        </label>
      </div>

      {/* Start Hole Button */}
      {useGeolocation && (
        <button
          onClick={() => {
            navigator.geolocation.getCurrentPosition((pos) => {
              const { latitude, longitude } = pos.coords;
              const location = { lat: latitude, lon: longitude };
              setTeeLocation(location);
              setPreviousLocation(location);
            });
          }}
          className="w-full mb-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
        >
          Start Hole (Set Tee Location)
        </button>
      )}


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
      {shots.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-green-700 mb-2">Shot History</h3>
          <ul className="space-y-2">
            {shots.map((shot, index) => (
              <li
                key={index}
                className="bg-green-100 border border-green-300 rounded-xl p-3 text-sm text-gray-800"
              >
                {shot.putts !== undefined ? (
                  <span className="font-medium">
                    Hole {shot.hole}: {shot.putts} putts
                  </span>
                ) : (
                  <>
                    <span className="font-medium">
                      Hole {shot.hole}, Shot {shot.shot}:
                    </span>{' '}
                    {shot.club} → {shot.result}
                    {shot.distance && (
                      <span className="ml-2 text-xs text-gray-600">
                        ({shot.distance} yds)
                      </span>
                    )}
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function calculateDistance(loc1, loc2) {
  const R = 6371e3;
  const φ1 = (loc1.lat * Math.PI) / 180;
  const φ2 = (loc2.lat * Math.PI) / 180;
  const Δφ = ((loc2.lat - loc1.lat) * Math.PI) / 180;
  const Δλ = ((loc2.lon - loc1.lon) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) *
    Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 1.09361); // yards
}

