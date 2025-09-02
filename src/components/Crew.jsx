import { useState, useEffect } from "react";
import React from "react";

function Crew() {
  const url = "http://localhost:3001/crew";
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url);
      const jsonData = await response.json();
      setData(jsonData);
    };
    fetchData();
  }, []);

  return (
    <>
      <ul className="member-grid">
        {data.map((member, index) => (
          <li key={index}>
            <img
              src={member.image}
              title="Click for details"
              style={{ width: "200px", height: "200px" }}
              className="zoom-image"
            />
            <h2>{member.name}</h2>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Crew;
