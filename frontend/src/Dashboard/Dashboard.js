import React, { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, NavLink } from "react-router-dom";

export default function Dashboard({ client, setIsLoggedIn }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const addMutation = useMutation(
    (url) => {
      return client.Records.create("user_nums", {
        user: client.AuthStore.model.id,
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
  const removeMutation = useMutation(
    (numId) => {
      console.log(numId.numId);
      console.log(typeof numId.numId);
      return client.Records.delete("user_nums", numId.numId);
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
  let favorite_ids = [];
  for (const item of data.items) {
    favorite_numbers.push(item.num + " ");
    favorite_ids.push(item.id);
  }

  return (
    <div>
      <div>My {client.AuthStore.model.email} favorite numbers</div>
      <div>{favorite_ids}</div>
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
      <button
        onClick={() => {
          removeMutation.mutate(
            { numId: favorite_ids[0] },
            {
              onSuccess: () => {
                console.log("button remove scucces");
              },
            }
          );
        }}
      >
        Delete number
      </button>

      <button onClick={logOutClicked}>Log out</button>
    </div>
  );
}
