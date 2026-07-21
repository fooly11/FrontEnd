import { useEffect, useState } from "react";

import { getLocation, updateLocation } from "../api/locationApi";

import { useParams } from "react-router-dom";

function LocationU() {
  const { id } = useParams();

  const [form, setForm] = useState({});

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const response = await getLocation(id);

    setForm(response.data.locations);
  };

  const update = async () => {
    await updateLocation(id, form);

    alert("수정 완료");
  };

  return (
    <div>
      <h1>주소 수정</h1>

      <input
        value={form.name || ""}
        onChange={(e) =>
          setForm({
            ...form,
            name: e.target.value,
          })
        }
      />

      <button onClick={update}>수정</button>
    </div>
  );
}

export default LocationU;
