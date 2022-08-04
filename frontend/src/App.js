import React, { useState } from "react";
import "./App.css";
import Auth from "./auth/pocketbase";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import Preferences from "./Preferences/Preferences";
import PocketBase from "pocketbase";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
export function getApiDomain() {
  return process.env.REACT_APP_API_URL;
}

function App() {
  const client = new PocketBase(getApiDomain());
  const [isLoggedIn, setIsLoggedIn] = useState(client.AuthStore.isValid);

  console.log(client.AuthStore.isValid);
  console.log(client.AuthStore.model.email);
  if (!isLoggedIn) {
    return <Auth client={client} setIsLoggedIn={setIsLoggedIn} />;
  }
  return (
    <div className="wrapper">
      <h1>Application</h1>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Link to="/">
            <button>home</button>
          </Link>
          <Link to="/dashboard">
            <button>dashboard</button>
          </Link>
          <Link to="/preferences">
            <button>preferences</button>
          </Link>

          <Routes>
            {/* <Route path="/" element={<App />} /> */}
            <Route
              path="dashboard"
              element={
                <Dashboard client={client} setIsLoggedIn={setIsLoggedIn} />
              }
            />
            <Route path="preferences" element={<Preferences />} />
            <Route path="/" element={<Preferences />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
