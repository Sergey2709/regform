import React from 'react';
import { Table } from 'reactstrap';

const List = props => {
  return (
    <Table striped>
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
        </tr>
      </thead>
      <tbody>
        <tr></tr>
      </tbody>
    </Table>
  );
};

export default List;
