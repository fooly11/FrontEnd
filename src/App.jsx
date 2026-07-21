import { BrowserRouter, Routes, Route } from "react-router-dom";

import Location from "./pages/Location";

import "./App.css";

function App() {
  return (
    <div className="app-container">
      <BrowserRouter>
        <Routes>
          <Route path="/location/view" element={<Location />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
