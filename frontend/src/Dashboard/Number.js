import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export default function Number({ number, numberId, client }) {
  const queryClient = useQueryClient();

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
