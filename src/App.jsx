import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Launches from "./components/Launches";
import Welcome from "./components/Welcome";
import Launch from "./components/Launch";
import Navigation from "./components/Navigation";
function App() {
  const url = "https://api.spacexdata.com/v3/launches";
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url);
      const jsonData = await response.json();
      setData(jsonData);
      setFilteredData(jsonData);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = data.filter((launch) =>
      launch.mission_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchTerm, data]);

  return (
    <div className="container">
      <h1>SpaceX Launches (v3)</h1>

      <div className="container-nav-main">
        <nav className="sidebar">
          <Navigation />
        </nav>
        <main className="main">
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/launches/:id" element={<Launch data={data} />} />
            <Route
              path="/launches"
              element={
                <Launches
                  searchTerm={searchTerm}
                  filteredData={filteredData}
                  setSearchTerm={setSearchTerm}
                />
              }
            />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
