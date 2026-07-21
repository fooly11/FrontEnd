import { BrowserRouter, Routes, Route } from "react-router-dom";

import Location from "./pages/Location";
import LocationC from "./pages/LocationC";
import LocationU from "./pages/LocationU";

import "./App.css";

function App() {
  return (
    <div className="app-container">
      <BrowserRouter>
        <Routes>
          <Route path="/location/view" element={<Location />} />
          <Route path="/location/add" element={<LocationC />} />
          <Route path="/location/fix/:id" element={<LocationU />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
