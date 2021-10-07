import React from "react";
import { Table } from "reactstrap";
import { getDatabase, ref, child, get } from "firebase/database";

const List = () => {

  const dbRef = ref(getDatabase());
  console.log(dbRef);
  get(child(dbRef, `users`))
    .then((snapshot) => {
      // if (snapshot.exists()) {
        console.log(snapshot.child); // ishi
      // } else {
        // console.log("No data available");
      // }
    })
    .catch((error) => {
      console.error(error);
    });

  return (
    <div
      // style={{
      //   maxWidth: "80%",
      //   display: "flex",
      //   flexDirection: "column",
      //   margin: "auto",
      // }}
    >
      <Table striped>
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Report</th>
          </tr>
        </thead>
        <tbody>
          <tr></tr>
        </tbody>
      </Table>
    </div>
  );
};

export default List;
