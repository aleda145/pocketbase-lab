import React, { useState } from "react";
import "./App.css";
import Auth from "./auth/pocketbase";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
function App() {
  const [token, setToken] = useState();
  console.log(token);
  const client = new PocketBase("http://localhost:8090");
  console.log(client.AuthStore.isValid);
  console.log(client.AuthStore.model.email);
  if (!client.AuthStore.isValid) {
    return <Auth client={client} />;
  }
  return (
    <div className="wrapper">
      <h1>Application</h1>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            {/* <Route path="/" element={<App />} /> */}
            <Route path="dashboard" element={<Dashboard client={client} />} />
            <Route path="preferences" element={<Preferences />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
