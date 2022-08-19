import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export default function Number({ number, numberId, client }) {
  const queryClient = useQueryClient();

  const removeMutation = useMutation(
    (numId) => {
      return client.Records.delete("user_nums", numId.numId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("favNumbers");
        console.log("Deletion Success!");
      },
      onError: (error) => {
        console.log(error);
        error.customError = error.response.data.message;
      },
    }
  );

  return (
    <tr>
      <td>{number}</td>
      <td>
        <button
          onClick={() => {
            removeMutation.mutate({ numId: numberId });
          }}
        >
          Delete number
        </button>
      </td>
    </tr>
  );
}
