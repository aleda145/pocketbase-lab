import React, { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, NavLink } from "react-router-dom";

export default function Dashboard({ client, setIsLoggedIn }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const addMutation = useMutation(
    (url) => {
      // return axios.post(getApiDomain() + "/scrape", url);
      // return "ok";
      return client.Records.create("user_nums", {
        user: "KoDn7hCUaY8BIGG",
        num: 42,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("favNumbers");
        console.log("succes");
      },
      onError: (error) => {
        console.log(error);
        error.customError = error.response.data.message;
      },
    }
  );
  async function logOutClicked() {
    await client.AuthStore.clear();
    setIsLoggedIn(false);
    navigate("/");
  }
  const { isLoading, error, data } = useQuery(["favNumbers"], () =>
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

      <button
        onClick={() => {
          addMutation.mutate(
            { url: "ok" },
            {
              onSuccess: () => {
                console.log("button scucces");
              },
            }
          );
        }}
      >
        Lägg till nummer
      </button>

      <button onClick={logOutClicked}>Log out</button>
    </div>
  );
}
