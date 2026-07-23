import { useState, useEffect } from "react";
import axios from "axios";
import { getLocation, updateLocation } from "../api/locationApi";
import { useParams, useNavigate } from "react-router-dom";
import logo from "../assets/logo1.png";
import "./../css/locationC.css";

function LocationU() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    name: "",
    address: "",
  });

  const [keyword, setKeyword] = useState("");
  const [addresses, setAddresses] = useState([]);

  //기존 데이터 불러오기
  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const response = await getLocation(id);
      console.log("주소 조회 응답:", response.data);
      setForm({
        name: response.data.locations.name,
        address: response.data.locations.address,
      });
    } catch (error) {
      console.log("주소 불러오기 실패:", error);
    }
  };

  //도로명 주소 api 호출
  const searchAddress = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/location/search/address",
        {
          params: {
            keyword: keyword, //사용자가 입력한 검색어
          },
        },
      );

      console.log("백엔드 응답:", response.data);

      const result = response.data.results?.juso;

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
    if (keyword.length < 2) {
      setAddresses([]);
      return;
    }

    const timer = setTimeout(() => {
      searchAddress();
    }, 500); //0.5초 마다 두글자 이상 키워드가 변경되면 api 호출: 디바운싱

    return () => clearTimeout(timer);
  }, [keyword]);

  const change = (e) => {
    setForm({
      ...form, //form 값 복사
      [e.target.name]: e.target.value,
    });
  };
  const isValid = form.name.trim() !== "" && form.address.trim() !== "";
  //form 값을 변경함, 백엔드 호출
  const submit = async () => {
    if (!form.name || !form.address) {
      alert("주소 별칭과 주소를 입력해주세요.");
      return;
    }
    await updateLocation(id, {
      name: form.name,
      address: form.address,
    });

    alert("주소가 성공적으로 수정되었습니다.");
    navigate("/location/view");
  };

  return (
    <div>
      <div className="location-logo">
        <img src={logo} alt="logo" />
      </div>

      <h1>주소 수정하기</h1>

      <div className="input-box">
        <label>주소 별칭</label>
        <input
          name="name"
          placeholder="주소 별칭"
          value={form.name}
          onChange={change}
        />

        <label>주소 확인</label>

        <input
          name="address"
          value={form.address}
          placeholder="입력된 주소가 없습니다."
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
                  setKeyword(""); //검색창 비우기
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
          수정하기
        </button>
      </div>
    </div>
  );
}

export default LocationU;
