import { React, useState, useEffect } from 'react';
import { Table } from 'reactstrap';

import { collection, query, onSnapshot } from 'firebase/firestore';
import {db} from '../plugins/firebase';

const List = () => {
  const [output, setOutput] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'users'));
    const userArr = [];
    onSnapshot(q, snaps => {
      snaps.forEach(doc => {
        const userObj = doc._document.data.value.mapValue.fields;
        userArr.push(userObj);
        // console.log(userObj); // соберу стейты тут
      });
      setOutput(userArr);
    });
  }, []);

  // const getingImg = str => {
  //   // console.log(str);
  //   // const newStr =
  //   return btoa(str);
  // };

  return (
    <div
      style={{
        maxWidth: '70%',
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
      }}
    >
      <Table striped>
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Name</th>
            <th>Email</th>
            <th>Report</th>
          </tr>
        </thead>
        <tbody>
          {output.map(el => {
            return (
              <tr key={el.lastName.stringValue + el.firstName.stringValue + el.email.stringValue}>
                <th>
                  <img
                    src={`data:image/png;base64${el.img.stringValue}`}
                    alt='Your avatar'
                    style={{
                      height: '40px',
                    }}
                  />
                </th>
                <th>{`${el.firstName.stringValue} ${el.lastName.stringValue}`}</th>
                <th>{el.reportSubject.stringValue}</th>
                <th>{el.email.stringValue}</th>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default List;
