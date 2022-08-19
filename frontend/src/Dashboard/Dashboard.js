import React, { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, NavLink } from "react-router-dom";
import Number from "./Number";
export default function Dashboard({ client, setIsLoggedIn }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const addMutation = useMutation(
    (mutationData) => {
      return client.Records.create("user_nums", {
        user: client.AuthStore.model.id,
        num: mutationData.number,
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
  let favorite_ids = [];
  let number_list = [];
  for (const item of data.items) {
    number_list.push(
      <Number number={item.num} numberId={item.id} client={client} />
    );
  }

  return (
    <div>
      <button onClick={logOutClicked}>Log out</button>

      <div>My {client.AuthStore.model.email} favorite numbers</div>
      <button
        onClick={() => {
          addMutation.mutate(
            { number: 42 },
            {
              onSuccess: () => {
                console.log("button scucces");
              },
            }
          );
        }}
      >
        Add number
      </button>
      <table>
        <tr>
          <th>number</th>
          <th>Remove</th>
        </tr>
        {number_list}
      </table>
    </div>
  );
}
