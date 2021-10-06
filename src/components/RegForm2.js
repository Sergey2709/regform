import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import { addDoc, setDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyD8MO_d56OH9HnzmhJfakDAZMSX9MI-OUA',
  authDomain: 'regform-33ef9.firebaseapp.com',
  databaseURL: 'https://regform-33ef9-default-rtdb.firebaseio.com',
  projectId: 'regform-33ef9',
  storageBucket: 'regform-33ef9.appspot.com',
  messagingSenderId: '244226144863',
  appId: '1:244226144863:web:e8bcec7a74e534513279ea',
};

const app = initializeApp(firebaseConfig);

const db = getFirestore();
// console.log(db);

const RegForm2 = () => {
  const getData = e => {
    const newArr = [...e.target.parentNode].map(el => el.value);
    const idPreviousArr = localStorage.getItem(`nameOfDocument`);

    askServer();

    async function askServer() {
      const firstForm = doc(db, 'users', idPreviousArr);
      console.log(firstForm);

      await updateDoc(firstForm, {
        company: `${newArr[0]}`,
        position: `${newArr[1]}`,
        about: `${newArr[2]}`,
      });
    }
  };

  return (
    <div>
      <Form>
        <Label for="exampleForm">
          <h2>To participate in the conference, please fill out the form</h2>
        </Label>
        <br />
        <FormGroup>
          <Input type="text" name="text" id="exampleCompany" placeholder="Company" />
        </FormGroup>
        <br />
        <FormGroup>
          <Input type="text" name="text" id="examplePosition" placeholder="Position" />
        </FormGroup>
        <br />
        <FormGroup>
          <Input type="textarea" name="text" id="exampleAbout" placeholder="Tell us about you" />
        </FormGroup>
        <br />
        <FormGroup>
          <Input type="file" name="file" id="exampleFile" />
          <FormText color="muted">You can add your photo</FormText>
        </FormGroup>
        <Button>
          <a href="/">Previous</a>
        </Button>{' '}
        <Button onClick={getData}>Submit</Button>{' '}
        <Button>
          <a href="/list">Next</a>
        </Button>
      </Form>
    </div>
  );
};

export default RegForm2;
