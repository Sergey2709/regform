import { React, useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import { addDoc, collection } from 'firebase/firestore';

import { db } from '../plugins/firebase';

const RegForm2 = () => {

  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [about, setAbout] = useState('');
  const [img, setImg] = useState('');

  const [companyDirty, setCompanyDirty] = useState(false);
  const [positionDirty, setPositionDirty] = useState(false);

  const [companyError, setCompanyError] = useState('Can`t be empty');
  const [positionError, setPositionError] = useState('Can`t be empty');

  const settingCompany = e => {
    setCompany(e.target.value);
    if (e.target.value < 1 || e.target.value > 20) {
      setCompanyError('Can`t be empty');
    } else {
      setCompanyError('');
    }
  };

  const settingPosition = e => {
    setPosition(e.target.value);
    if (e.target.value < 1 || e.target.value > 20) {
      setPositionError('Can`t be empty');
    } else {
      setPositionError('');
    }
  };

  const settingAbout = e => {
    setAbout(e.target.value);
  };

  const setImage = e => {
    const file = e.target.files[0];

    let reader = new FileReader();
    reader.onload = e => {
      let image = e.target.result;
      localStorage.setItem('img', image);
    };

    reader.readAsDataURL(file);
  };

  const blurHandler = e => {
    switch (e.target.name) {
      case 'company':
        setCompanyDirty(true);
        break;
      case 'position':
        setPositionDirty(true);
        break;
    }
  };

  useEffect(() => {
      if (window.localStorage.getItem('company') === null) {
        setCompany('');
      } else {
        setCompany(window.localStorage.getItem('company'));
      }

      if (window.localStorage.getItem('position') === null) {
        setPosition('');
      } else {
        setPosition(window.localStorage.getItem('position'));
      }
    
      if (window.localStorage.getItem('about') === null) {
        setAbout('');
      } else {
        setAbout(window.localStorage.getItem('about'));
      }
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
          {companyDirty && companyError && <div style={{ color: 'red' }}>{companyError}</div>}
          <Input
            onChange={settingCompany}
            onBlur={e => blurHandler(e)}
            type="text"
            name="company"
            id="exampleCompany"
            placeholder="Company"
            value={company}
          />
        </FormGroup>
        <br />
        <FormGroup>
          {positionDirty && positionError && <div style={{ color: 'red' }}>{positionError}</div>}
          <Input
            onChange={settingPosition}
            onBlur={e => blurHandler(e)}
            type="text"
            name="position"
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
            name="about"
            id="exampleAbout"
            placeholder="Tell us about you"
            value={about}
          />
        </FormGroup>
        <br />
        <FormGroup>
          <Input type="file" name="image" id="exampleFile" onChange={setImage} />
          <FormText color="muted">You can add your photo</FormText>
        </FormGroup>
        <Button onClick={previous}>Previous</Button> <Button onClick={submitted}>Submit</Button>{' '}
        <Button onClick={next}>Next</Button>
      </Form>
    </div>
  );
};

export default RegForm2;
