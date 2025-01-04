import { useState } from "react";
import "./App.css";

const dictionaryData = [
  {
    word: "React",
    meaning: "A JavaScript library for building user interfaces.",
  },
  { word: "Component", meaning: "A reusable building block in React." },
  { word: "State", meaning: "An object that stores data for a component." },
];

function App() {
  const [searchTxt, setSearchTxt] = useState("");
  const [showDictionaryText, setShowDictionaryText] = useState([]);
  const [wordPre, setWordPre] = useState(false);
  const [err, setErr] = useState("");

  const handleClickSearch = (e) => {
    e.preventDefault();

    if (!searchTxt) {
      // If the search input is empty, display an error message
      setErr("Word not found in the dictionary.");
      setWordPre(false);
      return;
    }

    const filteredState = dictionaryData.filter(
      (w) => w.word.toLowerCase() === searchTxt.toLowerCase()
    );

    if (filteredState.length > 0) {
      setShowDictionaryText(filteredState);
      setWordPre(true);
      setErr(""); // Clear any previous error
    } else {
      setErr("Word not found in the dictionary.");
      setWordPre(false);
    }
  };

  return (
    <div className="App">
      <h1>Dictionary App</h1>
      <div>
        <form>
          <input
            type="text"
            value={searchTxt}
            placeholder="Search for a word..."
            onChange={(e) => setSearchTxt(e.target.value)}
          />
          <button onClick={handleClickSearch}>Search</button>
        </form>
      </div>
      <div>
        <h3>Definition:</h3>
        {wordPre ? (
          showDictionaryText.map((item) => (
            <div key={item.word}>
              <p>
                <strong>{item.word}:</strong> {item.meaning}
              </p>
            </div>
          ))
        ) : (
          <p>{err || "Please search for a word."}</p>
        )}
      </div>
    </div>
  );
}

export default App;
