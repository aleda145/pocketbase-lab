import React, { useState } from "react";
import PropTypes from "prop-types";
export default function Auth({ client, setIsLoggedIn }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    </div>
  );
}

Auth.propTypes = {
  client: PropTypes.any.isRequired,
};
