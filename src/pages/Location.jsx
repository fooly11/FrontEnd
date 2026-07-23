import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLocations } from "../api/locationApi";
import { checkLocation } from "../api/locationApi";
import logo from "../assets/logo.png";
import "./../css/location.css";

function Location() {
  const [locations, setLocations] = useState([]);

  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    loadLocation();
  }, []);

  const loadLocation = async () => {
    const response = await getLocations();

    setLocations(response.data.locations);
  };

  const handleCheck = async (id) => {
    await checkLocation(id);
    loadLocation();
  };

  return (
    <div className="location-container">
      <div className="hamburger-area">
        <button
          className="hamburger-button"
          onClick={() => {
            setMenuOpen(!menuOpen);
          }}
        >
          ☰
        </button>

        {menuOpen && (
          <div className="menu">
            <p onClick={() => navigate("/roulette")}>룰렛 돌리기</p>
            <p onClick={() => navigate("/location/view")}>내 주소</p>
            <p onClick={() => navigate("/regist/logout")}>로그아웃</p>
          </div>
        )}
      </div>
      <div className="location-logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="address-list">
        <h1>내 주소 목록</h1>
        <div className="address-scroll">
          {locations.map((location) => (
            <div className="address-item" key={location.id}>
              <button
                className={`check-btn ${location.is_check ? "active" : ""}`}
                onClick={() => handleCheck(location.id)}
              >
                ✔
              </button>
              <div className="address-info">
                <h3>{location.name}</h3>
                <p>{location.address}</p>
              </div>
              <div className="Ubutton">
                <button
                  onClick={() => navigate(`/location/fix/${location.id}`)}
                >
                  수정하기 ▸
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="main-button">
        <button onClick={() => navigate("/location/add")}>
          + 다른 주소 추가하기
        </button>
      </div>
    </div>
  );
}

export default Location;
