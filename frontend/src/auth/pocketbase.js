import React, { useState } from "react";
export default function Auth({ client, setIsLoggedIn }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = await client.Users.authViaEmail(username, password);
    console.log(userData);
    setIsLoggedIn(client.AuthStore.isValid);
  };
  const handleSignUp = async (e) => {
    e.preventDefault();
    const user = await client.Users.create({
      email: username,
      password: password,
      passwordConfirm: password,
    });

    console.log(user);
    console.log(client.AuthStore.isValid);
    const userData = await client.Users.authViaEmail(username, password);
    console.log(userData);

    setIsLoggedIn(client.AuthStore.isValid);
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
      <h2>Or sign up</h2>
      <form onSubmit={handleSignUp}>
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
