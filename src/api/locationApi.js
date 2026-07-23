import axios from "axios";

// axios 기본 설정
// 모든 요청은 이 주소로 보냄
const api = axios.create({
  // Node.js 서버 주소
  baseURL: "http://localhost:3000",

  // 세션 쿠키를 같이 전송
  // express-session 사용하기 때문에 필요
  withCredentials: true,
});

// 사용자의 현재 위치 세션 저장
export const saveSessionLocation = (data) => {
  return api.post("/location/initial", data);
};

// 전체 위치 조회
export const getLocations = () => {
  return api.get("/location/view");
};

// 위치 추가
export const createLocation = (data) => {
  return api.post("/location/add", data);
};

// 특정 위치 조회: 수정화면
export const getLocation = (id) => {
  return api.get(`/location/fix/${id}`);
};

// 위치 수정
export const updateLocation = (id, data) => {
  return api.put(`/location/fix/${id}`, data);
};

// 위치 삭제
export const deleteLocation = (id) => {
  return api.delete(`/location/remove/${id}`);
};
//위치 선택
export const checkLocation = (id) => {
  return api.put(`/location/check/${id}`);
};
