import { React, useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

import Map from './Map';

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
  // firstName
  const [firstName, setFirstName] = useState('');
  const settingFirstName = e => {
    return setFirstName(e.target.value);
  };

  // lastName
  const [lastName, setLastName] = useState('');
  const settingLastName = e => {
    return setLastName(e.target.value);
  };

  //dateOfBirth
  const [dateOfBirth, setDateOfBirth] = useState('');
  const settingDateOfBirth = e => {
    return setDateOfBirth(e.target.value);
  };

  //reportSubject
  const [reportSubject, setReportSubject] = useState('');
  const settingReportSubject = e => {
    return setReportSubject(e.target.value);
  };

  //phoneNumber
  const [phoneNumber, setPhoneNumber] = useState('');
  const settingPhoneNumber = e => {
    return setPhoneNumber(e);
  };

  //email
  const [email, setEmail] = useState('');
  const settingEmail = e => {
    return setEmail(e.target.value);
  };

  useEffect(() => {
    setFirstName(window.localStorage.getItem('firstName'));
    setLastName(window.localStorage.getItem('lastName'));
    setDateOfBirth(window.localStorage.getItem('dateOfBirth'));
    setReportSubject(window.localStorage.getItem('reportSubject'));
    setPhoneNumber(window.localStorage.getItem('phoneNumber'));
    setEmail(window.localStorage.getItem('email'));
  }, []);

  const getData = e => {
    localStorage.setItem('phoneNumber', phoneNumber);
    localStorage.setItem('reportSubject', reportSubject);
    localStorage.setItem('dateOfBirth', dateOfBirth);
    localStorage.setItem('lastName', lastName);
    localStorage.setItem('firstName', firstName);
    localStorage.setItem('email', email);
    window.location.href = '/step2';
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
              onChange={settingFirstName}
              type="text"
              minLength="1"
              maxLength="15"
              name="firstName"
              id="exampleText"
              value={firstName}
              // ref={register}
              placeholder="Enter your first name"
            />
          </FormGroup>
          <br />
          <FormGroup>
            <Input
              onChange={settingLastName}
              type="text"
              minLength="1"
              maxLength="15"
              name="lastName"
              id="exampleText"
              value={lastName}
              // ref={register}
              placeholder="Enter your last name"
            />
          </FormGroup>
          <br />
          <FormGroup>
            <Input
              onChange={settingDateOfBirth}
              type="date"
              name="date"
              id="exampleDate"
              value={dateOfBirth}
              placeholder="date placeholder"
            />
          </FormGroup>
          <br />
          <FormGroup>
            <Input
              onChange={settingReportSubject}
              type="textarea"
              name="text"
              id="exampleTextArea"
              value={reportSubject}
              placeholder="Report subject"
            />
          </FormGroup>
          <br />

          <PhoneInput country={'us'} onChange={settingPhoneNumber} />
          <br />

          <FormGroup>
            <Input
              onChange={settingEmail}
              type="email"
              name="email"
              id="exampleEmail"
              placeholder="Email"
              // ref={register}
              value={email}
            />
          </FormGroup>

          <Button onClick={getData} type="submit">
            Next
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default RegForm;
