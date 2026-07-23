import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { createLocation } from "../api/locationApi";
import logo from "../assets/logo1.png";
import "./../css/locationC.css";

function LocationC() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    address: "",
    latitude: "",
    longitude: "",
  });

  const [keyword, setKeyword] = useState("");
  const [addresses, setAddresses] = useState([]);
  const searchAddress = async () => {
    console.log("searchAddress 실행");

    try {
      const response = await axios.get(
        "http://localhost:3000/location/search/address",
        {
          params: {
            keyword: keyword,
          },
        },
      );

      console.log("백엔드 응답:", response.data);

      const result = response.data.results?.juso;

      console.log("주소 리스트:", result);

      if (result) {
        setAddresses(result);
      } else {
        setAddresses([]);
      }
    } catch (error) {
      console.log("에러:", error);
    }
  };

  useEffect(() => {
    console.log("검색어 변경:", keyword);

    if (keyword.length < 2) {
      setAddresses([]);
      return;
    }

    const timer = setTimeout(() => {
      console.log("검색 실행");
      searchAddress();
    }, 500);

    return () => clearTimeout(timer);
  }, [keyword]);

  const change = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const isValid = form.name.trim() !== "" && form.address.trim() !== "";
  const submit = async () => {
    if (!form.name || !form.address) {
      alert("주소 별칭과 주소를 입력해주세요.");
      return;
    }

    try {
      await createLocation(form);

      alert("주소가 추가되었습니다!");

      navigate("/location/view");
    } catch (error) {
      console.log(error);
      alert("주소 추가에 실패하였습니다. 다시 시도해 주세요.");
    }
  };
  return (
    <div>
      <div className="location-logo">
        <img src={logo} alt="logo" />
      </div>

      <h1>주소 추가하기</h1>

      <div className="input-box">
        <label>주소 별칭</label>
        <input name="name" placeholder="주소 별칭" onChange={change} />

        <label>주소 확인</label>

        <input
          name="address"
          value={form.address}
          placeholder="입력된 주소가 없습니다."
          onChange={change}
          disabled
        />

        <div className="search">
          <input
            type="text"
            placeholder="도로명 주소를 입력하세요."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />

          <button onClick={searchAddress}>
            <img
              src="https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/icon/search.png"
              alt="검색"
            />
          </button>
        </div>

        {addresses.length > 0 && (
          <div className="address-list">
            {addresses.map((addr, index) => (
              <div
                className="address-item"
                key={`${addr.admCd}-${index}`}
                onClick={() => {
                  setForm({
                    ...form,
                    address: addr.roadAddr,
                  });

                  setAddresses([]); // 선택하면 후보 닫기
                }}
              >
                <p>{addr.roadAddr}</p>
                <span>{addr.zipNo}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="main-button">
        <button
          className="back-button"
          onClick={() => navigate("/location/view")}
        >
          이전
        </button>
        <button onClick={submit} disabled={!isValid}>
          추가하기
        </button>
      </div>
    </div>
  );
}

export default LocationC;
