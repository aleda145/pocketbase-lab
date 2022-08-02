import React, { useState } from "react";
import "./App.css";
import Auth from "./auth/pocketbase";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import Preferences from "./Preferences/Preferences";
function App() {
  const [token, setToken] = useState();
  console.log(token);
  if (!token) {
    return <Auth setToken={setToken} />;
  }
  return (
    <div className="wrapper">
      <h1>Application</h1>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<App />} /> */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="preferences" element={<Preferences />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
