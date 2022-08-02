import React from "react";

export default function Dashboard({ client }) {
  console.log(client);
  return <h2>Dashboard {client.AuthStore.model.email}</h2>;
}
