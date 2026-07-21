import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createLocation } from "../api/locationApi";
import logo from "../assets/logo1.png";
import "./../css/locationC.css";

function LocationU() {
  const { id } = useParams();
  const [form, setForm] = useState({
    name: "",
    address: "",
    latitude: "",
    longitude: "",
  });

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const response = await getLocation(id);
    setForm(response.data.location);
  };

  const change = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const update = async () => {
    await updateLocation(id, form);
    alert("수정 완료");
  };

  return (
    <div>
      <div className="location-logo">
        <img src={logo} alt="logo" />
      </div>
      <h1>주소 수정하기</h1>

      <div className="input-box">
        <label>주소 별칭 </label>
        <input name="name" placeholder="주소 별칭" onChange={change} />
        <label>주소 확인 </label>
        <input name="address" placeholder="주소" onChange={change} disabled />
        <div class="search">
          <input type="text" placeholder="검색어 입력" />
          <img src="https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/icon/search.png" />
        </div>
      </div>
      <div className="main-button">
        <button onClick={update}>수정하기</button>
      </div>
    </div>
  );
}
export default LocationU;
