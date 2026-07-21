import { useState } from "react";

import { createLocation } from "../api/locationApi";

function LocationC() {
  const [form, setForm] = useState({
    name: "",
    address: "",
    latitude: "",
    longitude: "",
  });

  const change = (e) => {
    setForm({
      ...form,

      [e.target.name]: e.target.value,
    });
  };

  const submit = async () => {
    await createLocation(form);

    alert("주소 추가 완료");
  };

  return (
    <div>
      <h1>주소 추가</h1>

      <input name="name" placeholder="이름" onChange={change} />

      <input name="address" placeholder="주소" onChange={change} />

      <input name="latitude" placeholder="위도" onChange={change} />

      <input name="longitude" placeholder="경도" onChange={change} />

      <button onClick={submit}>저장</button>
    </div>
  );
}

export default LocationC;
