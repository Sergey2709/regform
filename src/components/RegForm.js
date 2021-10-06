import { React, useState } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
// import { CountryDropdown } from 'react-country-region-selector';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

import Map from './Map';

import { addDoc, setDoc, collection } from 'firebase/firestore';
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

const RegForm = props => {
  const getData = e => {
    const newArr = [...e.target.parentNode].map(el => el.value);
    sendToServer();
    async function sendToServer(e) {
      try {
        const docRef = await addDoc(collection(db, 'users'), {
          firstName: `${newArr[0]}`,
          lastName: `${newArr[1]}`,
          dateOfBirth: `${newArr[2]}`,
          reportSubject: `${newArr[3]}`,
          phoneNumber: `${newArr[4]}`,
          email: `${newArr[5]}`,
          company: null,
          position: null,
          about: null,
        });
        localStorage.setItem('nameOfDocument', docRef.id);
        window.location.href = '/step2';
      } catch (e) {
        console.error('Error adding document: ', e);
      }
    }
  };

  return (
    <div>
      <Map />
      <div
        style={{
          maxWidth: '50%',
          display: 'flex',
          flexDirection: 'column',
          margin: 'auto',
        }}
      >
        <Form>
          <Label for="exampleForm">
            <h2>To participate in the conference, please fill out the form</h2>
          </Label>
          <FormGroup>
            <Input
              type="text"
              name="firstName"
              id="exampleText"
              placeholder="Enter your first name"
            />
          </FormGroup>
          <br />
          <FormGroup>
            <Input
              type="text"
              name="lastName"
              id="exampleText"
              placeholder="Enter your last name"
            />
          </FormGroup>
          <br />
          <FormGroup>
            <Input type="date" name="date" id="exampleDate" placeholder="date placeholder" />
          </FormGroup>
          <br />
          <FormGroup>
            <Input type="textarea" name="text" id="exampleTextArea" placeholder="Report subject" />
          </FormGroup>
          <br />

          <PhoneInput country={'us'} />
          <br />

          <FormGroup>
            <Input type="email" name="email" id="exampleEmail" placeholder="Email" />
          </FormGroup>

          <Button onClick={getData}>Next</Button>
        </Form>
      </div>
    </div>
  );
};

export default RegForm;
