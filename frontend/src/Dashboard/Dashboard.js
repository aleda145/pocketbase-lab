import React, { useEffect } from "react";

export default function Dashboard({ client }) {
  const getCars = async () => {
    client.Records.getList("user_nums", 1, 50, {
      filter: "created >= '2022-01-01 00:00:00'",
    })
      .then(function (list) {
        // success...
        console.log("list", list);
      })
      .catch(function (error) {
        // error...
        console.error("getlist error", error);
      });
  };
  //   console.log(client);
  useEffect(() => {
    getCars();
  });
  return (
    <div>
      <h2>Dashboard {client.AuthStore.model.email}</h2>
      {/* <div>{getCars()}</div> */}
    </div>
  );
}
