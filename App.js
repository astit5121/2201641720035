import React, { useState } from "react";
import "./App.css";

function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleShorten = async () => {
    setError("");
    setShortUrl("");
    if (!url) {
      setError("Please enter a valid URL");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`https://api.shrtco.de/v2/shorten?url=${encodeURIComponent(url)}`);
      const data = await res.json();
      if (data.ok) {
        setShortUrl(data.result.full_short_link);
      } else {
        setError("Failed to shorten URL. Try a valid URL.");
      }
    } catch {
      setError("Network error. Please try again.");
    }
    setLoading(false);
  };

  const copyToClipboard = () => {
    if (shortUrl) {
      navigator.clipboard.writeText(shortUrl);
      alert("Shortened URL copied to clipboard!");
    }
  };

  return (
    <div className="app-container">
      <h1>React URL Shortener</h1>
      <input
        type="url"
        placeholder="Enter URL here"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button onClick={handleShorten} disabled={loading}>
        {loading ? "Shortening..." : "Shorten URL"}
      </button>
      {error && <p className="error-message">{error}</p>}
      {shortUrl && (
        <div className="result-container">
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a>
          <button className="copy-button" onClick={copyToClipboard}>Copy</button>
        </div>
      )}
    </div>
  );
}

export default App;
