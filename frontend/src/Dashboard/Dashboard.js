import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, NavLink } from "react-router-dom";

export default function Dashboard({ client }) {
  const navigate = useNavigate();

  async function logOutClicked() {
    await client.AuthStore.clear();
    navigate("/dashboard");
  }
  const { isLoading, error, data } = useQuery(["repoData"], () =>
    client.Records.getList("user_nums", 1, 50, {
      filter: "created >= '2022-01-01 00:00:00'",
    })
  );

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;
  let favorite_numbers = [];
  for (const item of data.items) {
    favorite_numbers.push(item.num + " ");
  }
  return (
    <div>
      <div>My {client.AuthStore.model.email} favorite numbers</div>
      <div>{favorite_numbers}</div>
      <button onClick={logOutClicked}>Log out</button>
    </div>
  );
}
