import { useState } from 'react';

function App() {
  const [hole, setHole] = useState('');
  const [club, setClub] = useState('');
  const [result, setResult] = useState('');
  const [location, setLocation] = useState(null);
  const [submitted, setSubmitted] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted({
      hole,
      club,
      result,
      location
    });
  };

  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      (err) => {
        alert("Could not get location");
        console.error(err);
      }
    );
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "500px", margin: "0 auto" }}>
      <h1>CloudCaddie - Shot Entry</h1>
      <form onSubmit={handleSubmit}>
        <label>Hole:</label><br />
        <input type="number" value={hole} onChange={(e) => setHole(e.target.value)} /><br /><br />

        <label>Club:</label><br />
        <select value={club} onChange={(e) => setClub(e.target.value)}>
          <option value="">Select Club</option>
          <option value="Driver">Driver</option>
          <option value="3 Wood">3 Wood</option>
          <option value="5 Iron">5 Iron</option>
          <option value="7 Iron">7 Iron</option>
          <option value="9 Iron">9 Iron</option>
          <option value="Wedge">Wedge</option>
          <option value="Putter">Putter</option>
        </select><br /><br />

        <label>Result:</label><br />
        <input type="text" value={result} onChange={(e) => setResult(e.target.value)} /><br /><br />

        <button type="button" onClick={getLocation}>Get GPS Location</button><br /><br />

        <button type="submit">Submit Shot</button>
      </form>

      {submitted && (
        <div style={{ marginTop: "2rem" }}>
          <h3>Submitted Data</h3>
          <pre>{JSON.stringify(submitted, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
