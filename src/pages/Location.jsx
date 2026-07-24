import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getLocations } from "../api/locationApi";
import { checkLocation } from "../api/locationApi";
import logo from "../assets/logo.png";
import rouletteIcon from "../assets/roulette.png";
import locationIcon from "../assets/location.png";
import loginIcon from "../assets/login.png";
import logoutIcon from "../assets/logout.png";
import "./../css/location.css";

function Location() {
  const [locations, setLocations] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    checkLogin();
    loadLocation();
  }, []);

  const loadLocation = async () => {
    const response = await getLocations();

    setLocations(response.data.locations);
  };
  const checkLogin = async () => {
    const response = await axios.get("http://localhost:3000/regist/check", {
      withCredentials: true,
    });

    setIsLogin(response.data.isLogin);
  };

  const handleCheck = async (id) => {
    try {
      // 화면 먼저 변경
      setSelectedId(id);

      // DB 업데이트
      await checkLocation(id);
    } catch (err) {
      console.log(err);
    }
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
            <p onClick={() => navigate("/roulette")}>
              <img src={rouletteIcon} alt="룰렛" />
              룰렛 돌리기
            </p>
            <p onClick={() => navigate("/location/view")}>
              {" "}
              <img src={locationIcon} alt="주소" />내 주소
            </p>
            {isLogin ? (
              <p onClick={() => navigate("/regist/logout")}>
                <img src={logoutIcon} alt="로그아웃" />
                로그아웃
              </p>
            ) : (
              <p onClick={() => navigate("/regist/login")}>
                <img src={loginIcon} alt="로그인" />
                로그인
              </p>
            )}
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
                className={`check-btn ${
                  selectedId === location.id ? "active" : ""
                }`}
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
