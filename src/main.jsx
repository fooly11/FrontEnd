// React 라이브러리
import React from "react";

// React를 실제 HTML 화면에 연결하는 기능
import ReactDOM from "react-dom/client";

// 우리가 만든 App 컴포넌트
import App from "./App.jsx";

// index.html의
// <div id="root"></div>
// 위치에 React를 렌더링
ReactDOM.createRoot(document.getElementById("root")).render(
  // App.jsx 실행
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
