import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Number from "./Number";
export default function Dashboard({ client }) {
  const queryClient = useQueryClient();
  const [newNumber, setNewNumber] = useState(0);

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
        console.log("Adding Success!");
      },
      onError: (error) => {
        console.log(error);
        error.customError = error.response.data.message;
      },
    }
  );

  const { isLoading, error, data } = useQuery(["favNumbers"], () =>
    client.Records.getList("user_nums", 1, 50, {
      filter: "created >= '2022-01-01 00:00:00'",
    })
  );

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;
  let number_list = [];
  data.items.forEach((item, index) => {
    number_list.push(
      <Number
        key={index}
        number={item.num}
        numberId={item.id}
        client={client}
      />
    );
  });

  return (
    <div>
      <div>My {client.AuthStore.model.email} favorite numbers</div>
      <input
        type="number"
        id="number"
        name="number"
        onChange={(event) => setNewNumber(event.target.value)}
        value={newNumber}
      />
      <button
        onClick={() => {
          addMutation.mutate({ number: newNumber });
        }}
      >
        Add number
      </button>
      <table>
        <thead>
          <tr>
            <th>number</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>{number_list}</tbody>
      </table>
    </div>
  );
}
