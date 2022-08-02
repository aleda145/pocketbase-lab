import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

export default function Dashboard({ client }) {
  const { isLoading, error, data } = useQuery(["repoData"], () =>
    client.Records.getList("user_nums", 1, 50, {
      filter: "created >= '2022-01-01 00:00:00'",
    })
  );

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;
  console.log(data);
  console.log(data.items);
  let favorite_numbers = [];
  for (const item of data.items) {
    favorite_numbers.push(item.num + " ");
  }
  return (
    <div>
      <div>{favorite_numbers}</div>
    </div>
  );
}
