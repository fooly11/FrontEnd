import { useEffect, useState } from "react";

import { getLocations } from "../api/locationApi";
import logo from "../assets/logo.png";
function Location() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    loadLocation();
  }, []);

  const loadLocation = async () => {
    const response = await getLocations();

    setLocations(response.data.locations);
  };

  return (
    <div className="location-container">
      <div className="location-logo">
        <img src={logo} alt="logo" />
      </div>

      <div className="address-list">
        <h1>내 주소 목록</h1>

        {locations.map((location) => (
          <div className="address-item" key={location.id}>
            <div>
              <h3>{location.name}</h3>
              <p>{location.address}</p>
            </div>

            <div className="Ubutton">수정하기 ▸</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Location;
