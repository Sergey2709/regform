import { React, useState, useEffect } from 'react';
import { Table, Button } from 'reactstrap';

import { collection, query, onSnapshot } from 'firebase/firestore';
import { db } from '../plugins/firebase';

import defaultImg from '../image/112.jpg';

const List = () => {
  const [output, setOutput] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'users'));
    const userArr = [];
    onSnapshot(q, snaps => {
      snaps.forEach(doc => {
        const userObj = doc._document.data.value.mapValue.fields;
        userArr.push(userObj);
      });
      setOutput(userArr);
    });
  }, []);

  const register = () => {
    window.location.href = '/';
  };

  const getPathImg = pathImg => {
    if (pathImg) {
      return pathImg;
    } else {
      return defaultImg;
    }
  };

  return (
    <div
      style={{
        maxWidth: '80%',
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
                    src={getPathImg(el.img.stringValue)}
                    alt="Your avatar"
                    style={{
                      height: '40px',
                    }}
                  />
                </th>
                <th>{`${el.firstName.stringValue} ${el.lastName.stringValue}`}</th>
                <th>{el.email.stringValue}</th>
                <th>{el.reportSubject.stringValue}</th>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Button onClick={register} style={{ width: '100px' }}>
        Register
      </Button>
    </div>
  );
};

export default List;
