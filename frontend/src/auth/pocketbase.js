import React, { useState } from "react";
import PocketBase from "pocketbase";

// const client = new PocketBase("http://localhost:8090");

// const userData = client.Users.authViaEmail("test@example.com", "12345678");
// console.log(userData);

export default function Auth() {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    const client = new PocketBase("http://localhost:8090");
    e.preventDefault();
    const userData = await client.Users.authViaEmail(username, password);
    console.log(userData);
  };
  return (
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={(e) => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
