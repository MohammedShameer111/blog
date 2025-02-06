import React, { useEffect, useState } from "react";

const App = () => {
  const [location, setLocation] = useState(null);
  const [manualSelection, setManualSelection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null); // Store error messages

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          let latitude = position.coords.latitude;
          let longitude = position.coords.longitude;

          console.log("Latitude:", latitude);
          console.log("Longitude:", longitude);

          if (latitude >= 8 && latitude <= 37 && longitude >= 68 && longitude <= 97) {
            setLocation("IN"); // India
          } else if (latitude >= 24 && latitude <= 49 && longitude >= -125 && longitude <= -66) {
            setLocation("US"); // USA
          } else {
            setLocation("Other");
          }
          setLoading(false);
        },
        (error) => {
          console.error("Geolocation Error:", error);
          setLoading(false);

          if (error.code === error.PERMISSION_DENIED) {
            setErrorMsg("Location access is blocked. Please allow it in your browser settings.");
          } else if (error.code === error.POSITION_UNAVAILABLE) {
            setErrorMsg("Location information is unavailable. Try again later.");
          } else if (error.code === error.TIMEOUT) {
            setErrorMsg("Location request timed out. Please refresh and try again.");
          } else {
            setErrorMsg("An unknown error occurred.");
          }

          setLocation("Permission Denied");
        }
      );
    } else {
      setErrorMsg("Geolocation is not supported by your browser.");
      setLocation("Geolocation Not Supported");
      setLoading(false);
    }
  }, []);

  const handleManualSelection = (country) => {
    setManualSelection(country);
  };

  const finalLocation = manualSelection || location;

  return (
    <div style={styles.container}>
      <h2>Location-Based Blog</h2>

      {loading && <p>🔄 Detecting location...</p>}

      {errorMsg && (
        <div style={styles.errorBox}>
          <p>⚠️ {errorMsg}</p>
          <p>Please enable location access or select a country below:</p>
        </div>
      )}

      {finalLocation === "IN" && (
        <div style={styles.content}>
          <h1>🇮🇳 Welcome to the Indian Blog</h1>
          <p>Read the latest news, updates, and stories from India...</p>
        </div>
      )}

      {finalLocation === "US" && (
        <div style={styles.content}>
          <h1>🇺🇸 Welcome to the American Blog</h1>
          <p>Stay updated with news, trends, and articles from the USA...</p>
        </div>
      )}

      {finalLocation === "Other" && (
        <div style={styles.content}>
          <h1>🌍 Welcome to the Global Blog</h1>
          <p>Discover international stories, news, and more.</p>
        </div>
      )}

      {(location === "Permission Denied" || location === "Geolocation Not Supported") && (
        <div style={styles.manualSelection}>
          <h2>Unable to detect location. Please select your country:</h2>
          <button style={styles.button} onClick={() => handleManualSelection("IN")}>🇮🇳 India</button>
          <button style={styles.button} onClick={() => handleManualSelection("US")}>🇺🇸 USA</button>
        </div>
      )}
    </div>
  );
};

// Simple inline CSS styles
const styles = {
  container: {
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    padding: "20px",
  },
  content: {
    background: "#f4f4f4",
    padding: "20px",
    borderRadius: "10px",
    margin: "20px auto",
    maxWidth: "500px",
  },
  errorBox: {
    background: "#ffcccb",
    padding: "10px",
    borderRadius: "5px",
    color: "red",
    fontWeight: "bold",
  },
  manualSelection: {
    marginTop: "20px",
  },
  button: {
    margin: "10px",
    padding: "10px 15px",
    fontSize: "16px",
    cursor: "pointer",
    border: "none",
    borderRadius: "5px",
    background: "#007bff",
    color: "#fff",
  },
};

export default App;
