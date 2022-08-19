import React, { useState } from "react";
import "./App.css";
import Auth from "./auth/pocketbase";
import Dashboard from "./Dashboard/Dashboard";
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
  async function logOutClicked() {
    client.authStore.clear();
    setIsLoggedIn(false);
  }
  const [isLoggedIn, setIsLoggedIn] = useState(client.authStore.isValid);
  if (isLoggedIn) {
    console.log("refreshing");
    client.users.refresh().catch((error) => {
      console.log(error);
      client.authStore.clear();
      setIsLoggedIn(false);
    });
  }
  if (!isLoggedIn) {
    return (
      <div className="App">
        <Auth client={client} setIsLoggedIn={setIsLoggedIn} />
      </div>
    );
  }
  return (
    <div className="App">
      <h1>Application</h1>
      <QueryClientProvider client={queryClient}>
        <button onClick={logOutClicked}>Log out</button>
        <Dashboard client={client} />
      </QueryClientProvider>
    </div>
  );
}

export default App;
