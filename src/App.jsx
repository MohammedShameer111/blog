import React, { useEffect, useState } from "react";

const App = () => {
  const [location, setLocation] = useState(null);
  const [manualSelection, setManualSelection] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          let latitude = position.coords.latitude;
          let longitude = position.coords.longitude;

          // ✅ Uncomment the below lines to simulate testing locations (for USA or India)
          // latitude = 37.7749;  // San Francisco, USA
          // longitude = -122.4194; 

          console.log("Detected Latitude:", latitude);
          console.log("Detected Longitude:", longitude);

          if (latitude >= 8 && latitude <= 37 && longitude >= 68 && longitude <= 97) {
            setLocation("IN"); // India
          } else if (latitude >= 24 && latitude <= 49 && longitude >= -125 && longitude <= -66) {
            setLocation("US"); // USA
          } else {
            setLocation("Other");
          }
        },
        (error) => {
          console.error("Location error:", error);
          setLocation("Permission Denied");
        }
      );
    } else {
      setLocation("Geolocation Not Supported");
    }
  }, []);

  // Function for manual country selection
  const handleManualSelection = (country) => {
    setManualSelection(country);
  };

  const finalLocation = manualSelection || location;

  return (
    <div style={styles.container}>
      <h2> Location-Based Blog</h2>

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
          <h1> Welcome to the Global Blog</h1>
          <p>Discover international stories, news, and more.</p>
        </div>
      )}

      {(location === "Permission Denied" || location === "Geolocation Not Supported") && (
        <div style={styles.manualSelection}>
          <h2> Unable to detect location. Please select your country:</h2>
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
