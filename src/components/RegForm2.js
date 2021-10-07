import { React, useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import { addDoc, collection } from 'firebase/firestore';
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

const RegForm2 = () => {
  // Company
  const [company, setCompany] = useState('');

  const settingCompany = e => {
    return setCompany(e.target.value);
  };

  // Position
  const [position, setPosition] = useState('');

  const settingPosition = e => {
    return setPosition(e.target.value);
  };

  // About
  const [about, setAbout] = useState('');

  const settingAbout = e => {
    return setAbout(e.target.value);
  };

  //img

  const [img, setImg] = useState('');

  const setImage = e => {
    const file = e.target.files[0];

    let reader = new FileReader();
    reader.onload = e => {
      let image = e.target.result;
      localStorage.setItem('img', image);
    };

    reader.readAsDataURL(file);
  };

  useEffect(() => {
    setCompany(window.localStorage.getItem('company'));
    setPosition(window.localStorage.getItem('position'));
    setAbout(window.localStorage.getItem('about'));
  }, []);

  const pushToLocal = () => {
    localStorage.setItem('company', company);
    localStorage.setItem('position', position);
    localStorage.setItem('about', about);
  };

  const previous = () => {
    pushToLocal();
    window.location.href = '/';
  };

  const submitted = e => {
    pushToLocal();
    askServer();
  };

  const next = () => {
    pushToLocal();
    askServer();
    window.location.href = '/list';
  };

  async function askServer() {
    try {
      const docRef = await addDoc(collection(db, 'users'), {
        firstName: localStorage.getItem(`firstName`),
        lastName: localStorage.getItem(`lastName`),
        dateOfBirth: localStorage.getItem(`dateOfBirth`),
        reportSubject: localStorage.getItem(`reportSubject`),
        phoneNumber: localStorage.getItem(`phoneNumber`),
        email: localStorage.getItem(`email`),
        company: localStorage.getItem(`company`),
        position: localStorage.getItem(`position`),
        about: localStorage.getItem(`about`),
        img: localStorage.getItem(`img`),
      });

      setCompany('');
      setPosition('');
      setAbout('');

      localStorage.clear();
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }

  return (
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
        <br />
        <FormGroup>
          <Input
            onChange={settingCompany}
            type="text"
            name="text"
            id="exampleCompany"
            placeholder="Company"
            value={company}
          />
        </FormGroup>
        <br />
        <FormGroup>
          <Input
            onChange={settingPosition}
            type="text"
            name="text"
            id="examplePosition"
            placeholder="Position"
            value={position}
          />
        </FormGroup>
        <br />
        <FormGroup>
          <Input
            onChange={settingAbout}
            type="textarea"
            name="text"
            id="exampleAbout"
            placeholder="Tell us about you"
            value={about}
          />
        </FormGroup>
        <br />
        <FormGroup>
          <Input type="file" name="file" id="exampleFile" onChange={setImage} />
          <FormText color="muted">You can add your photo</FormText>
        </FormGroup>
        <Button onClick={previous}>Previous</Button> <Button onClick={submitted}>Submit</Button>{' '}
        <Button onClick={next}>Next</Button>
      </Form>
    </div>
  );
};

export default RegForm2;
